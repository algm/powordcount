import React from "react";
import PropTypes from "prop-types";

function FileList({ files }) {
  const translations = files.value.map(
    ({ file, content: { translations } }) => {
      const translated = Object.values(translations).map((translation) => {
        const translationObj = Object.values(translation)[0];

        return {
          original: translationObj.msgid,
          translation: translationObj.msgstr[0],
          originalWords: translationObj.msgid.trim().split(/\s+/).length,
          translationWords: translationObj.msgstr[0].trim().split(/\s+/).length,
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
    <div className="overflow-y-auto text-left">
      <div className="m-b-3 flex flex-row">
        <div className="px-2">
          <strong>Total words</strong>
        </div>
        <div className="px-2">original: {totals.original}</div>
        <div className="px-2">translation: {totals.translation}</div>
      </div>

      {translations.map((t, i) => {
        return (
          <div key={i} className="flex flex-row p-3">
            <div className="px-2">{t.file}</div>
            <div className="px-2">
              <p>original words: {t.totalCounts.original}</p>
              <p>translation words: {t.totalCounts.translation}</p>
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
