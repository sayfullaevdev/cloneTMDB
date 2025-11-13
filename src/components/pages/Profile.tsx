import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useUser } from "@/providers/UserProvider";
import { useSettings } from "@/providers/SettingsProvider";

export default function Profile() {
    const { user, setName } = useUser();
    const { theme, toggleTheme, notifications, toggleNotifications } = useSettings();
    const [newName, setNewName] = useState("");


    return (
        <div className="flex justify-center items-center min-h-screen bg-background text-foreground transition-colors duration-300 py-10">
            <Card className="w-full max-w-lg bg-card text-card-foreground shadow-xl rounded-2xl p-6 border border-border transition-colors duration-300">
                <CardHeader className="flex flex-col items-center gap-2">
                    <CardTitle className="text-2xl font-semibold text-center">
                        МОЙ ПРОФИЛЬ
                    </CardTitle>

                    <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-border mt-4 shadow-md">
                        <img
                            src="https://avatars.githubusercontent.com/u/000000?v=1"
                            alt="Profile"
                            className="object-cover w-full h-full"
                        />
                    </div>



                    <div>
                        <p>{user ? user.name : "Загрузка..."}</p>
                        <p>{user ? user.email : ""}</p>
                    </div>




                    <p className="text-muted-foreground text-sm mt-1">
                        Редактирование профиля
                    </p>
                </CardHeader>

                <CardContent className="space-y-5 mt-6">
                    {/* Инпут для нового имени */}
                    <div className="space-y-2">
                        <Label htmlFor="newName">Новое имя:</Label>
                        <Input
                            id="newName"
                            type="text"
                            placeholder="Введите новое имя"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className="bg-input text-foreground border border-border focus:border-primary"
                        />
                    </div>


                    <div className="flex justify-between items-center pt-4">
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="notifications"
                                checked={notifications}
                                onCheckedChange={toggleNotifications}
                            />
                            <Label htmlFor="notifications" className="text-sm text-muted-foreground">
                                Получать уведомления
                            </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Switch
                                id="theme"
                                checked={theme === "dark"}
                                onCheckedChange={toggleTheme}
                            />
                            <Label htmlFor="theme" className="text-sm text-muted-foreground">
                                Тёмная тема
                            </Label>
                        </div>
                    </div>

                    <div className="flex justify-end pt-6">
                        <Button
                            onClick={() => {
                                if (newName.trim()) setName(newName);
                                setNewName("");
                            }}
                        >
                            Сменить имя
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
