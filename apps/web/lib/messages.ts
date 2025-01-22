export const messages = {
  errors: {
    auth: {
      invalidCredentials: "Неверные учетные данные",
    },
    users: {
      notFound: "Пользователь не найден",
      alreadyExists: "Пользователь с такой почтой уже существует",
      notFoundPlural: "Пользователи не найдены",
    },
    common: {
      unexpectedError: "Произошла непредвиденная ошибка",
      forbidden: "Доступ запрещен",
      databaseError: "Произошла ошибка в базе данных",
      unauthorized: "Пользователь не авторизован",
      notFound: "Ресурс не найден",
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
    establishments: "Заведения",
    establishmentsDescription: "Управление заведениями",
    establishment: "Заведение",
    usersDescription: "Управление пользователями",
    welcome: "Добро пожаловать",
    signature: "С уважением, Digital Menu",
    password: "Пароль",
    email: "Электронная почта",
    link: "Ссылка",
    slug: "Слаг",
    save: "Сохранить",
    username: "Имя пользователя",
    name: "Название",
    role: "Роль",
    admin: "Администратор",
    owner: "Владелец заведения",
    locked: "Заблокирован",
    cancel: "Отменить",
    continue: "Продолжить",
    search: "Поиск",
    back: "Назад",
    next: "Вперед",
  },
  validation: {
    required: "Обязательное поле",
    email: "Неверная почта",
    enum: "Неверное значение",
    format: "Неверный формат",
    alreadyExists: "Значение уже существует",
    min: (length: number) => `Минимальная длина поля ${length}`,
    max: (length: number) => `Максимальная длина поля ${length}`,
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
      "Все данные пользователя и связанные с ним данные будут удалены!",
    deleted: "Пользователь успешно удален",
  },
  establishments: {
    create: "Создать заведение",
    createDescription: "Создание нового заведения",
    created: "Заведение успешно создано",
    deleteEstablishmentDescription:
      "Все данные заведения и связанные с ним данные будут удалены!",
    deleted: "Заведение успешно удалено",
  },
} as const;
