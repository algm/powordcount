import React from 'react';
import PropTypes from 'prop-types';
import exportExcel from '../services/excel';

function FileList({ files }) {
  const translations = files.value.map(
    ({ file, content: { translations } }) => {
      const translated = Object.values(translations)
        .filter(
          (t) => Object.values(t)[0].msgid && Object.values(t)[0].msgid.length
        )
        .map((translation) => {
          const translationObj = Object.values(translation)[0];

          return {
            original: translationObj.msgid,
            translation: translationObj.msgstr[0],
            originalWords: translationObj.msgid.trim().split(/\s+/).length,
            translationWords: translationObj.msgstr[0].trim().split(/\s+/)
              .length,
          };
        });

      return {
        file: file.path,
        translations: translated,
        totalCounts: {
          original: translated.reduce((acc, item) => {
            return acc + item.originalWords;
          }, 0),
          translation: translated.reduce((acc, item) => {
            return acc + item.translationWords;
          }, 0),
        },
      };
    }
  );

  const totals = {
    original: translations.reduce((acc, item) => {
      return acc + item.totalCounts.original;
    }, 0),
    translation: translations.reduce((acc, item) => {
      return acc + item.totalCounts.translation;
    }, 0),
  };

  return (
    <div className="overflow-y-auto text-left space-y-3 items-center justify-center">
      <div className="flex flex-row space-x-2">
        <div className="flex flex-row space-x-2 flex-1 items-start items-center">
          <div className="py-2 pr-2">
            <strong>Total words</strong>
          </div>
          <div className="py-2 pr-2">original: {totals.original}</div>
          <div className="py-2">translation: {totals.translation}</div>
        </div>
        <div className="py-2">
          <button
            className="p-3 text-center bg-blue-700 border-1 border-blue-900 text-blue-200"
            onClick={() => {
              const data = translations.reduce((arr = [], file) => {
                arr.push(
                  ...file.translations.map((t) => ({ file: file.file, ...t }))
                );

                return arr;
              }, []);

              console.log({ data });

              exportExcel(data, 'all_translations');
            }}
          >
            Export to Excel
          </button>
        </div>
      </div>

      {translations.map((t, i) => {
        return (
          <div
            key={i}
            className="flex flex-row items-center justify-between content-between p-3 space-x-3 border border-gray-600"
          >
            <div className="py-2 pr-2 flex-1">{t.file}</div>
            <div className="py-2 pr-2 flex-1">
              <p>original words: {t.totalCounts.original}</p>
              <p>translation words: {t.totalCounts.translation}</p>
            </div>
            <div className="py-2">
              <button
                className="p-3 text-center bg-blue-700 border-1 border-blue-900 text-blue-200"
                onClick={() => {
                  const data = t.translations;

                  console.log({ data });

                  exportExcel(data, t.file);
                }}
              >
                Export to Excel
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

FileList.propTypes = {
  files: PropTypes.object.isRequired,
};

export default FileList;
