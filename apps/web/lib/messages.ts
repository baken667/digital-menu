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
      unauthorized: "Пользователь не авторизован",
    },
  },
  auth: {
    successfulLogin: "Вы вошли в систему",
    yourAccountCreated: "Ваш аккаунт успешно создан",
    loginText:
      "Чтобы продолжить, перейдите по ссылке в письме и войдите в систему указанными учетными данными",
  },
  alert: {
    confirmAction: "Подтвердите действие",
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
    locked: "Заблокирован",
    cancel: "Отменить",
    continue: "Продолжить",
  },
  users: {
    create: "Создать пользователя",
    createDescription: "Создание нового пользователя",
    created: "Пользователь успешно создан",
    edit: "Редактировать пользователя",
    editDescription: "Изменение данных пользователя",
    edited: "Пользователь успешно обновлен",
    selectUserRole: "Выберите роль пользователя",
    deleteUserDescription:
      "Все данные пользователя и связанные с ним заказы будут удалены!",
    deleted: "Пользователь успешно удален",
  },
  validation: {
    required: "Обязательное поле",
    email: "Неверная почта",
    enum: "Неверное значение",
    min: (length: number) => `Минимальная длина поля ${length}`,
    max: (length: number) => `Максимальная длина поля ${length}`,
  }
} as const;
