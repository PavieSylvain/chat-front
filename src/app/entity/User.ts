export class User {
  id: number | undefined;
  pseudo: string | undefined;
  password: string | undefined;
  civility_id: number | undefined;
  firstname: string | undefined;
  lastname:string | undefined;
  birthAt: Date | undefined;
  email: string | undefined;

  constructor()
  constructor(pseudo: string, password: string, civility_id: number, firstname: string, lastname: string, birthAt: Date, email: string)
  constructor(pseudo?: string, password?: string, civility_id?: number, firstname?: string, lastname?: string, birthAt?: Date, email?: string, id?: number) {
    this.id = id;
    this.pseudo = pseudo;
    this.password = password;
    this.civility_id = civility_id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.birthAt = birthAt;
    this.email = email;
  }
}


