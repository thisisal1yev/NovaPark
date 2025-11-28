import { Switch, Route } from "wouter";
import Header from "@/components/Header";
import HomePage from "@/pages/home";
import SessionsPage from "@/pages/sessions";
import ProfilePage from "@/pages/profile";
import NotFound from "@/pages/not-found";

export default function UserLayout() {
  return (
    <div className="flex flex-col h-screen bg-background">
      <Header
        userName="Алексей"
        isLoggedIn={true}
        onLogin={() => console.log("Login")}
        onLogout={() => console.log("Logout")}
      />
      <main className="flex-1 overflow-auto">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/sessions" component={SessionsPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}
