import { useState } from "react";

export default function AuthModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const validators: Record<string, (value: string) => string> = {
    username: (v) => {
      if (isLogin) return "";
      if (v.trim().length < 2) return "Имя должно быть не короче 2 символов";
      return "";
    },
    email: (v) => {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))
        return "Введите корректный email";
      return "";
    },
    password: (v) => {
      if (v.length < 6) return "Пароль должен быть не короче 6 символов";
      return "";
    },
    password2: (v) => {
      if (isLogin) return "";
      if (v.length < 6) return "Пароль должен быть не короче 6 символов";
      if (v !== formData.password) return "Пароли не совпадают";
      return "";
    },
  };

  const validateOne = (field: string, value: string) => {
    const error = validators[field]?.(value) ?? "";
    setErrors((prev) => ({ ...prev, [field]: error }));
    return error;
  };

  const validateAll = () => {
    const fields = isLogin
      ? ["email", "password"]
      : ["username", "email", "password", "password2"];
    const newErrors: Record<string, string> = {};
    for (const f of fields) {
      newErrors[f] =
        validators[f]?.(formData[f as keyof typeof formData] as string) ?? "";
    }
    setErrors((prev) => ({ ...prev, ...newErrors }));
    const touchedUpd: Record<string, boolean> = {};
    fields.forEach((f) => (touchedUpd[f] = true));
    setTouched((prev) => ({ ...prev, ...touchedUpd }));
    return Object.values(newErrors).every((e) => e === "");
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) validateOne(field, value);
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateOne(field, formData[field as keyof typeof formData]);
  };

  const getInputClass = (field: string) => {
    if (!touched[field]) return "border-gray-300";
    return errors[field] ? "border-red-500" : "border-green-500";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");

    if (!validateAll()) return;

    setLoading(true);
    try {
      const API_BASE =
        (typeof import.meta !== "undefined" &&
          (import.meta as any).env?.VITE_API_BASE) ||
        (typeof process !== "undefined" &&
          (process as any).env?.REACT_APP_API_BASE) ||
        (window.location.hostname === "localhost" ||
          window.location.hostname === "127.0.0.1"
          ? "http://localhost:8080"
          : "");

      const url = isLogin
        ? `${API_BASE}/api/auth/login/`
        : `${API_BASE}/api/auth/register/`;

      const body = isLogin
        ? {
          email: formData.email,
          password: formData.password,
        }
        : {
          name: formData.username,
          email: formData.email,
          password: formData.password,
          password2: formData.password2,
        };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        if (typeof data === "object" && data !== null) {
          const msg =
            Object.values(data).flat().join(" ") || "Ошибка авторизации";
          throw new Error(msg);
        }
        throw new Error(data.detail || "Ошибка авторизации");
      }

      if (data.access) localStorage.setItem("access", data.access);
      if (data.refresh) localStorage.setItem("refresh", data.refresh);

      if (data.user?.name) {
        localStorage.setItem("username", data.user.name);
      } else if (data.name) {
        localStorage.setItem("username", data.name);
      }

      onClose();
    } catch (err: any) {
      setServerError(err.message || "Ошибка");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="animate-fadeIn fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div className="animate-scaleIn relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <h2 className="mb-4 text-2xl font-bold">
          {isLogin ? "Вход" : "Регистрация"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              onBlur={() => handleBlur("email")}
              className={`mt-1 block w-full rounded-md border ${getInputClass("email")} p-2`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Имя пользователя
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => handleChange("username", e.target.value)}
                onBlur={() => handleBlur("username")}
                className={`mt-1 block w-full rounded-md border ${getInputClass("username")} p-2`}
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-500">{errors.username}</p>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Пароль
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              onBlur={() => handleBlur("password")}
              className={`mt-1 block w-full rounded-md border ${getInputClass("password")} p-2`}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Повторите пароль
              </label>
              <input
                type="password"
                value={formData.password2}
                onChange={(e) => handleChange("password2", e.target.value)}
                onBlur={() => handleBlur("password2")}
                className={`mt-1 block w-full rounded-md border ${getInputClass("password2")} p-2`}
              />
              {errors.password2 && (
                <p className="mt-1 text-sm text-red-500">{errors.password2}</p>
              )}
            </div>
          )}

          {serverError && <p className="text-sm text-red-500">{serverError}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-blue-600 p-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Загрузка..." : isLogin ? "Войти" : "Зарегистрироваться"}
          </button>
        </form>

        <div className="mt-4 text-center">
          {isLogin ? (
            <p>
              Нет аккаунта?{" "}
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className="text-blue-600 hover:underline"
              >
                Зарегистрируйтесь
              </button>
            </p>
          ) : (
            <p>
              Уже есть аккаунт?{" "}
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className="text-blue-600 hover:underline"
              >
                Войдите
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
