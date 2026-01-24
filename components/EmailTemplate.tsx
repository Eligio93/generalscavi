interface EmailTemplateProps {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

export function EmailTemplate({
  firstName,
  lastName,
  email,
  message,
}: EmailTemplateProps) {
  return (
    <div>
      <h1>New Message from, {`${firstName} ${lastName}`}!</h1>
      <p>{email}</p>
      <p>{message}</p>
    </div>
  );
}
