import './score.scss';
import { BaseComponent } from '../base-component';
import { User } from '../../models/user';

export class Score extends BaseComponent {
  db?: IDBDatabase;

  constructor() {
    super('div', ['score']);
    this.element.innerHTML = `
      <h2 class="title">Best players</h2>
    `;
    this.openBD();
  }

  openBD = (): void => {
    const openRequest = <IDBOpenDBRequest>indexedDB.open('halaveika', 1);
    openRequest.onerror = (event:Event): void => {
      if (event.target) this.db = <IDBDatabase>openRequest.result;
    };
    openRequest.onsuccess = (event:Event): void => {
      if (event.target) this.db = <IDBDatabase>openRequest.result;
      if (this.db) this.getAndDisplayNotes(this.db);
    };
    openRequest.onupgradeneeded = (): void => {
      this.db = <IDBDatabase>openRequest.result;
      if (!this.db.objectStoreNames.contains('users')) {
        this.db.createObjectStore('users', {
          keyPath: 'id',
          autoIncrement: true,
        });
      }
    };
  };

  getAndDisplayNotes = (db: IDBDatabase): void => {
    const tx = db.transaction(['users'], 'readonly');
    const store = tx.objectStore('users');
    const req = store.openCursor();
    const allNotes: User[] = [];
    req.onsuccess = () => {
      const cursor = req.result;
      if (cursor != null) {
        allNotes.push(<User>cursor.value);
        cursor.continue();
      } else {
        const topScore = this.filterUserDataByScore(allNotes);
        this.displayUsers(topScore);
      }
    };
    req.onerror = () => {
      throw new Error('error in cursor request');
    };
  };

  filterUserDataByScore = (users: User[]): User[] => {
    const usersArr = users.slice(0);
    const result = usersArr.sort((a, b) => {
      if (Number(<string>b.score) > Number(<string>a.score)) {
        return 1;
      }
      if (Number(<string>b.score) < Number(<string>a.score)) {
        return -1;
      }
      return 0;
    });
    return result.slice(0, 10);
  };

  displayUsers = (users: Array<User>): void => {
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const row = new BaseComponent('div', ['score__row']);
      row.element.innerHTML = `
        <div class="score__container">
          <img class="score__avatar" src="" alt="user" id="avatar${i}">
          <div class="score__user-info">
            <span class="score__userName" >${user.userFirstName} ${user.userLastName}</span>
            <span class="score__email">${user.userEmail}</span>
          </div>
        </div>
        <span class="score__number">Score: <mark>${user.score}</mark></span>
      `;
      this.element.appendChild(row.element);
      const avatar = <HTMLImageElement>document.getElementById(`avatar${i}`);
      if (avatar) avatar.src = user.avatar;
    }
  };
}
