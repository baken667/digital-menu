import { messages } from "@/lib/messages";

interface Props {
  name: string;
  email: string;
  password: string;
  url: string;
}

export function NewAccountEmail({ name, email, password, url }: Props) {
  return (
    <div>
      <h1>{`${messages.common.welcome}, ${name}!`}</h1>
      <p>{messages.auth.yourAccountCreated}</p>
      <p>
        {messages.common.link}: <a href={url}>{url}</a>
      </p>
      <ul>
        <li>
          {messages.common.email}: {email}
        </li>
        <li>
          {messages.common.password}: {password}
        </li>
      </ul>
    </div>
  );
}
