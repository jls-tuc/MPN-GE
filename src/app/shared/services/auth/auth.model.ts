export class AuthModel {
  token: string;
  refreshToken: string;
  expiresIn: Date;
  foto: string;

  setAuth(auth: any) {
    this.token = auth.token;
    this.refreshToken = auth.refreshToken;
    this.expiresIn = auth.expiresIn;
    this.foto = auth.foto;
  }
}
