export const messages = {
  errors: {
    auth: {
      invalidCredentials: "Неверные учетные данные",
    },
    users: {
      notFound: "Пользователь не найден",
      alreadyExists: "Пользователь с такой почтой уже существует",
    },
    common: {
      unxpectedError: "Произошла непредвиденная ошибка",
      forbidden: "Доступ запрещен",
      databaseError: "Произошла ошибка в базе данных",
    },
  },
  auth: {
    successfulLogin: "Вы вошли в систему",
    yourAccountCreated: "Ваш аккаунт успешно создан",
    loginText:
      "Чтобы продолжить, перейдите по ссылке в письме и войдите в систему указанными учетными данными",
  },
  common: {
    app: "Digital Menu",
    auth: {
      login: "Войти",
      logout: "Выйти",
    },
    all: "Все",
    dashboard: "Панель управления",
    profile: "Профиль",
    users: "Пользователи",
    usersDescription: "Управление пользователями",
    welcome: "Добро пожаловать",
    signature: "С уважением, Digital Menu",
    password: "Пароль",
    email: "Электронная почта",
    link: "Ссылка",
    save: "Сохранить",
    username: "Имя пользователя",
    role: "Роль",
    admin: "Администратор",
    owner: "Владелец заведения",
  },
  users: {
    create: "Создать пользователя",
    createDescription: "Создание нового пользователя",
    edit: "Редактировать пользователя",
    editDescription: "Редактирование пользователя",
    selectUserRole: "Выберите роль пользователя",
  }
} as const;
