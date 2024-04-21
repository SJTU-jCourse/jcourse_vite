const ContactEmail = () => {
  return (
    <a href={`mailto:${import.meta.env.VITE_CONTACT_EMAIL}`}>
      {" "}
      {import.meta.env.VITE_CONTACT_EMAIL}{" "}
    </a>
  );
};

export default ContactEmail;
