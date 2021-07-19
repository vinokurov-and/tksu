import React from "react";
import Table from "../components/Table";
import Layout from "../components/layout";

const columns = [
  {
    title: "Показатель",
    width: "100%",
    field: "indicator",
  },
  { title: "Количество под данным кафедры", field: "count" },
];

export default () => {
  return (
    <Layout>
      <article className="sheet">
        <div className="sheet__inner">
          <h1 className="sheet__lead" style={{ fontWeight: 800 }}>
            <strong>
              РЕЗУЛЬТАТИВНОСТЬ И ЭФФЕКТИВНОСТЬ НИР В ______ ГОДУ по кафедре ____
            </strong>
          </h1>
          <Table
            columns={columns}
            table={"table12"}
            initialData={[
              {
                indicator:
                  "Сотрудники кафедры, защитившие диссертации на соискание ученой степени доктора наук",
              },
            ]}
          />
        </div>
      </article>
    </Layout>
  );
};
