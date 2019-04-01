export class User {
  private _email: string
  private _id: number
  private _name: string

  constructor() { }

  public get email(): string {
    return this._email
  }

  public set email(value: string) {
    this._email = value
  }

  public get id(): number {
    return this._id
  }

  public set id(value: number) {
    this._id = value
  }

  public get name(): string {
    return this._name
  }

  public set name(value: string) {
    this._name = value
  }
}