import { Link, Outlet } from "react-router";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { useSaved } from "@/providers/SavedProvider";
import { Badge } from "./ui/badge";
import GlobalTrailer from "./custom/GlobalTrailer";


function Layout() {
  const { saved } = useSaved();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300 relative">
      <header className="flex items-center justify-between px-6 py-4 bg-card border-b border-border">
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-2xl font-bold text-primary">
            IMDb
          </Link>

          <nav className="md:flex items-center space-x-4 text-sm">
            <Link to="/movies" className="hover:text-primary">
              Movies
            </Link>
            <Link to="/tv" className="hover:text-primary">
              TV Shows
            </Link>
            <Link to="/news" className="hover:text-primary">
              News
            </Link>
            <Link to="/saved" className="hover:text-primary flex items-center gap-1">
              Хочу посмотреть
              <Badge className="bg-destructive text-destructive-foreground">
                {saved.length}
              </Badge>
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-muted rounded-md">
            <Input
              type="text"
              placeholder="Search IMDb"
              className="bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 w-48 md:w-64 text-sm"
            />
            <Button variant="ghost" size="icon" className="text-primary hover:text-primary/80">
              🔍
            </Button>
          </div>

          <Link to="/profile">
            <Button variant="outline" className="border-border text-foreground">
              Профиль
            </Button>
          </Link>
        </div>
      </header>

      <Separator />

      <main className="flex-1 container mx-auto px-6 py-6 transition-colors duration-300">
        <Outlet />
      </main>

      <footer className="py-6 text-center text-sm text-muted-foreground border-t border-border">
        © {new Date().getFullYear()} IMDb Clone — Created with ❤️ by Dotlabs
      </footer>


      <GlobalTrailer />
    </div>
  );
}

export default Layout;
