import Header from "../Header";

export default function HeaderExample() {
  return (
    <Header
      userName="Алексей"
      isLoggedIn={true}
      onLogin={() => console.log("Login clicked")}
      onLogout={() => console.log("Logout clicked")}
    />
  );
}
