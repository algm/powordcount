/* eslint-disable react/no-unescaped-entities */
import React, { useCallback } from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Dropzone from "react-dropzone";
import { useArray } from "react-hanger";
import FileList from "../components/FileList";
import gettextParser from "gettext-parser";

function IndexPage() {
  const files = useArray([]);
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log({ binaryStr, content: gettextParser.po.parse(binaryStr) });
        files.removeById(file.path);
        files.push({
          id: file.path,
          file,
          content: gettextParser.po.parse(binaryStr),
        });
      };
      reader.readAsText(file);
    });
  }, []);

  return (
    <Layout>
      <SEO
        keywords={["utils", "wordcount", "po", "translations"]}
        title="PoWordCount"
      />

      <h1 className="font-bold my-3 text-2xl">Po files word count</h1>

      <section className="text-center">
        <div className="border-solid bg-gray-300 border-gray-600 mb-3">
          <Dropzone onDrop={onDrop}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p className="p-5">
                    Drop some files here, or click to select files
                  </p>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
        <FileList files={files}></FileList>
      </section>
    </Layout>
  );
}

export default IndexPage;
