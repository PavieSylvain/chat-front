class User{
  id: number;
  pseudo: string;
  password: string;
  civility_id: number;
  firstname: string;
  lastname:string;
  birthAt: Date;

  constructor(id: number, pseudo: string, password: string, civility_id: number, firstname: string, lastname: string, birthAt: Date) {
    this.id = id;
    this.pseudo = pseudo;
    this.password = password;
    this.civility_id = civility_id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.birthAt = birthAt;
  }
}


