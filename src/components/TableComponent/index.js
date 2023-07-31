import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, DatePicker } from "antd";
import moment from "moment";
import ModalForm from "../ModalForm";

const TableComponent = () => {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});
  const [searchText, setSearchText] = useState("");

  // Логика для открытия и закрытия модального окна
  const handleModalOpen = (mode) => {
    if (mode === "add") {
      setModalData({});
    }
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalData({});
    setModalVisible(false);
  };

  // Логика для добавления/редактирования данных из модального окна
  const handleModalSubmit = (values) => {
    if (modalData.index !== undefined) {
      // Редактирование существующей строки
      setData((prevData) =>
        prevData.map((item, index) =>
          index === modalData.index ? { ...values, key: item.key } : item
        )
      );
    } else {
      // Добавление новой строки
      setData((prevData) => [...prevData, { ...values, key: Date.now() }]);
    }
    setModalData({});
    handleModalClose();
  };

  // Логика для удаления строки из таблицы
  const handleDeleteRow = (record) => {
    setData((prevData) => prevData.filter((item) => item.key !== record.key));
  };

  // Данные для колонок таблицы
  const columns = [
    {
      title: "Имя",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ["ascend", "descend"],
      filteredValue: searchText ? [searchText] : null,
      onFilter: (value, record) =>
        record.name.toLowerCase().includes(value.toLowerCase()),
      ellipsis: true,
    },
    {
      title: "Дата",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
      sortDirections: ["ascend", "descend"],
      render: (text, record) => {
        const displayDate = record.key ? record.date : moment(text);
        return displayDate.format("DD.MM.YYYY");
      },
      ellipsis: true,
    },
    {
      title: "Числовое значение",
      dataIndex: "numericValue",
      key: "numericValue",
      sorter: (a, b) => a.numericValue - b.numericValue,
      sortDirections: ["ascend", "descend"],
      ellipsis: true,
    },
    {
      title: "Действия",
      key: "actions",
      render: (_, record) => (
        <span>
          <Button
            type="primary"
            onClick={() => {
              setModalData({ ...record, index: data.indexOf(record) });
              handleModalOpen("edit");
            }}
            style={{ marginRight: 8 }}
          >
            Редактировать
          </Button>
          <Button type="danger" onClick={() => handleDeleteRow(record)}>
            Удалить
          </Button>
        </span>
      ),
    },
  ];

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <Input.Search
          placeholder="Поиск по таблице"
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 200 }}
        />
        <Button
          type="primary"
          style={{ marginLeft: 16 }}
          onClick={() => handleModalOpen("add")}
        >
          Добавить
        </Button>
      </div>
      <Table dataSource={data} columns={columns} />
      <ModalForm
        visible={modalVisible}
        onCancel={handleModalClose}
        initialValues={modalData}
        onSubmit={handleModalSubmit}
      />
    </>
  );
};

export default TableComponent;
