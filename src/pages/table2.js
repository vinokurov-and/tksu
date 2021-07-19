import React from "react";
import Table from "../components/Table";
import Layout from "../components/layout";

export default () => (
  <Layout>
    <article className="sheet">
      <div className="sheet__inner">
        <h1 className="sheet__lead" style={{ fontWeight: 800 }}>
          <strong>
            Сведения о результатах научной и научно-методической работы (статьи
            и тезисы) кафедры ______ за _____ год
          </strong>
        </h1>
        <Table />
      </div>
    </article>
  </Layout>
);
