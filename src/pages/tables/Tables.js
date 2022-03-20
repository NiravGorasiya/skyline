import React, { useEffect, useState } from "react";
import { Grid, Button } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import { allbook, deletebook } from "../../Apiservices"
// components
import PageTitle from "../../components/PageTitle";
import * as Icons from "@material-ui/icons";
import swal from 'sweetalert';
import { toast } from "react-toastify";


export default function Tables(props) {
  const [datatableData, setdatatableData] = useState([])

  const list = () => {
    allbook()
      .then((response) => {
        setdatatableData(response.data.info)
      })
      .catch((err) => {
        console.log(localStorage.getItem("token"));
        console.log(err.response);
      })
  }

  useEffect(() => {
    list();
  }, [])

  const options = {
    filter: true,
    filterType: "dropdown",
    print: false,
    viewColumns: true,
    selectableRows: 'none',
    onRowClick: (rowData) => {
      console.log("RowClicked->", rowData);
    },
    responsive: "stacked",
    fixedHeaderOptions: {
      xAxis: false,
      yAxis: true,
    },
  };

  const columns = [
    {
      "name": "name",
      label: "name"
    },
    {
      "name": "author",
      label: "author"
    },
    {
      "name": "title",
      label: "title"
    },
    {
      "name": "rating",
      label: "rating"
    },
    {
      "name": "_id",
      label: "Action",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div>
              <Icons.Edit
                onClick={() => {
                  const editdata = datatableData.find(
                    (data) => data._id === value,
                  )
                  props.history.push({
                    pathname: "/app/book/add",
                    state: {
                      editdata: editdata,
                    }
                  })
                }}
              />{" "}
              <Icons.Delete
                onClick={async () => {
                  const confirm = await swal({
                    title: "Are you sure?",
                    text: "Are you sure that you want to delete this page?",
                    icon: "warning",
                    dangerMode: true,
                  })
                  if (confirm) {
                    deletebook(value)
                      .then(() => {
                        toast.success("Delete successfully", {
                          key: value,
                        })
                        list();
                      })
                      .catch(() => {
                        toast.error("something is wrong", {
                          key: value
                        })
                      })
                  }
                }}
              />
            </div>
          )
        }
      }

    }
  ]
  return (
    <>
      <PageTitle title="Tables"
        button={
          <>
            <Button
              variant="contained"
              size="medium"
              color="secondary"
              onClick={() => {
                props.history.push("/app/book/add");
              }}
            >
              Add Book
            </Button>
          </>
        }
      />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Book List"
            data={datatableData}
            columns={columns}
            options={options}
          />
        </Grid>
      </Grid>
    </>
  );
}
