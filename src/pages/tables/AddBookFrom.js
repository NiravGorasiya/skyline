import {
    Grid,
    CircularProgress,
    Typography,
    Button,
    FormControl,
    InputLabel,
    FormGroup,
    Input,
    TextField
} from "@material-ui/core";

import React, { useEffect, useState } from "react";
// data
import { updatebook, addBook } from "../../Apiservices";
// styles
import useStyles from "./styles";

// components
import Widget from "../../components/Widget/Widget";
import PageTitle from "../../components/PageTitle/PageTitle";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";


export default function AddBookFrom(props) {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false)
    const [name, setName] = useState("")
    const [author, setAuthor] = useState('')
    const [title, setTitle] = useState('')
    const [rating, setRating] = useState('')
    const [isupdate, setisupdate] = useState('')

    useEffect(() => {
        if (props.location.state) {
            if (props.location.state.editdata) {
                setisupdate(props.location.state.editdata._id)
                setName(props.location.state.editdata.name)
                setAuthor(props.location.state.editdata.author)
                setTitle(props.location.state.editdata.title)
                setRating(props.location.state.editdata.rating)
            }
        }
    }, [props.location.state])

    const handlesubmit = () => {
        const bookdata = { name, author, title, rating }
        setIsLoading(false);
        isupdate === ""
            ? addBook(bookdata)
                .then((response) => {
                    toast.success({
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                    props.history.push("/app/tables")
                })
                .catch((err) => {
                    console.log(err.response, "err");
                })
            : updatebook(bookdata,isupdate)
                .then((response) => {
                    console.log(response,"response");
                    toast.success("Updated successfully!");
                    props.history.push("/app/tables");
                })
                .catch((err) => {
                    console.log(err.response);
                    toast.error("somthing is wrong")
                })
    }

    return (
        <>
            <PageTitle title="Book Manage" />
            <Grid container spacing={4}>
                <Grid item xs={12} sm={12}>
                    <Widget
                        bodyClass={classes.mainChartBody}
                        header={
                            <div className={classes.mainChartHeader}>
                                <Typography
                                    variant="h5"
                                    color="text"
                                    colorBrightness="secondary"
                                    required
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                >
                                    Book Details
                                </Typography>
                            </div>
                        }
                    >
                        <FormGroup>
                            <FormControl>
                                <TextField
                                    id="outlined-basic"
                                    label="Name"
                                    variant="outlined"
                                    required
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </FormControl>
                            <FormControl>
                                <TextField
                                    id="outlined-basic"
                                    label="Author"
                                    variant="outlined"
                                    required
                                    value={author}
                                    onChange={e => setAuthor(e.target.value)}
                                />
                            </FormControl>
                            <FormControl>
                                <TextField
                                    id="outlined-basic"
                                    label="Title"
                                    variant="outlined"
                                    required
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                />
                            </FormControl>
                            <FormControl>
                                <TextField
                                    id="outlined-basic"
                                    label="Rating"
                                    variant="outlined"
                                    required
                                    value={rating}
                                    onChange={e => setRating(e.target.value)}
                                />
                            </FormControl>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handlesubmit}
                            >
                                Add Book
                            </Button>
                        </FormGroup>
                    </Widget>
                </Grid>
            </Grid>
        </>
    );
}

