import React, { useState } from "react";
import MaterialTable from "material-table";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import tableIcons from "../components/Icons";
import { useEffect } from "react";

export default ({
  table = "table2",
  columns = [
    {
      title: "№",
      type: "numeric",
      align: "center",
      width: "100%",
      field: "n",
    },
    { title: "Авторы (соавторы)", field: "authors" },
    { title: "Название статьи", field: "name" },
    {
      title: "Название журналиста или сборника научных трудов",
      field: "name_journalist",
    },
    {
      title: "Год издания",
      type: "numeric",
      field: "year",
    },
    {
      title: "Выходные данные журнала или сборника, издательство",
      field: "exit_date",
    },
    {
      title: "Объем в печатных листах",
      field: "lists",
    },
    {
      title:
        "Издания, индексируемые в международных наукометрических базах (Web of Science, Scopus, Google Scholar, ERIH (European Reference Index for then Humanities), Social Science Research Network и иные зарубежные информационно-аналитические системы (указать какие), признанные научным сообществом), рекомендованные ВАК",
      field: "article",
    },
  ],
  initialData = [
    {
      n: 1,
      authors: "Тимошина Н.В., Вино-градская М.Ю.",
      name:
        "Подготовка будущих педагогов к использованию информационных технологий в профессиональной деятельности",
      name_journalist: "Проблемы современно-го педагоги-ческого об-разования",
      year: 2017,
      exit_date:
        "Проблемы современно-го педагоги-ческого об-разования. Сер.: Педа-гогика и психология.- сборник научных трудов:- Ял-та: РИО ГПА,2017.-Вып.56.-Ч.10.-360с.",
      lists: "0,5",
      article: "Рекомендован ВАК",
    },
  ],
}) => {
  const getInitialData = () => {
    const lsData = localStorage.getItem(table);
    const localStorageData = (lsData && JSON.parse(lsData)) || initialData;
    return localStorageData;
  };

  const [data, setData] = useState(getInitialData());

  return (
    <MaterialTable
      localization={{
        body: {
          editRow: {
            deleteText: "Вы действительно хотите удалить эту запись?",
            saveTooltip: "Применить",
            cancelTooltip: "Отмена",
          },
          deleteTooltip: "Удалить",
          editTooltip: "Изменить",
        },
      }}
      editable={{
        onRowAdd: (newData) =>
          new Promise((res, rej) => {
            setData((prevState) => {
              localStorage.setItem(
                table,
                JSON.stringify([...prevState, newData])
              );
              return [...prevState, newData];
            });
            res();
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((res, rej) => {
            const dataUpdate = [...data];
            const index = oldData.tableData.id;
            dataUpdate[index] = newData;
            setData([...dataUpdate]);
            localStorage.setItem(table, JSON.stringify(dataUpdate));
            res();
          }),
        onRowDelete: (oldData) =>
          new Promise((res, rej) => {
            const dataDelete = [...data];
            const index = oldData.tableData.id;
            dataDelete.splice(index, 1);
            setData([...dataDelete]);
            localStorage.setItem(table, JSON.stringify(dataDelete));
            res();
          }),
      }}
      columns={columns}
      options={{
        search: false,
        sorting: false,
      }}
      data={data}
      title=""
      icons={tableIcons}
    />
  );
};
