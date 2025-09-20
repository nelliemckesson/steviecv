import { login, signup } from './actions';

export default function LoginPage() {
  return (
    <div className="login">
      <div className="product">
        <h1>StevieCV</h1>
        <p>Manage all the variations of your job descriptions in one place.</p>
        <p>Export a resumé tailored to each role.</p>
      </div>

      <div>
        <form>
          <label htmlFor="email">Email:</label>
          <input id="email" name="email" type="email" required />
          <label htmlFor="password">Password:</label>
          <input id="password" name="password" type="password" required />
          <fieldset>
            <button formAction={login}>Log in</button>
            <button formAction={signup}>Sign up</button>
          </fieldset>
        </form>
      </div>
    </div>
  )
}