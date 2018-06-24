Одностраничное приложение с использованием React.js + Redux для просмотра списка файлов Яндекс.Диска.
![Sample](https://raw.githubusercontent.com/mbelsky/yandex-disk-viewer/master/assets/sample.gif)

## Install

1.  `git clone git://github.com/mbelsky/yandex-disk-viewer.git mbelsky-yandex-disk-viewer`
2.  Run `npm install`
3.  Get OAuth token [there](https://oauth.yandex.ru/authorize?response_type=token&client_id=a77b04a7a44d4ac08d101cbc1151601d)
4.  `cp src/properties.js.local src/properties.js`
5.  Open `src/properties.js` and put OAuth token in `userToken` var
6.  `npm run start`

Требования:

- Использовать REST API Яндекс.Диска - https://tech.yandex.ru/disk/rest/
- Навигация по папкам, отображение их содержимого (только названия файлов и размер, каталоги должны быть отмечены иконкой каталога)
- Текущий State Должен сохраняться в URL
- Никаких операций редактирования, просмотра или загрузки новых файлов на Диск реализовывать не нужно
- Дизайн и верстка – с использованием Twitter Bootstrap (опционально)
