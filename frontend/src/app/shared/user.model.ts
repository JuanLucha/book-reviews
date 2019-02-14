export class User {
  private _email: string
  private _name: string

  constructor() { }

  public get email(): string {
    return this._email
  }

  public set email(value: string) {
    this._email = value
  }

  public get name(): string {
    return this._name
  }

  public set name(value: string) {
    this._name = value
  }
}