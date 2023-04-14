const express = require('express')
const mysql = require('mysql')
const bodyparser = require('body-parser')

const app = express()

app.use(bodyparser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyparser.json())




const pool = mysql.createPool({

    
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'moviesdb'
})


//the camp_cinema table

app.get('/cinema/movies', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
     
        connection.query('SELECT * from thecamp_cinema', (err, rows) => {
        

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            // if(err) throw err
            console.log('The data from beer table are: \n', rows)
        })
    })
})



app.post('/cinema/movies', (req, res) => {

    pool.getConnection((err, connection) => {

        if (err) throw err

        connection.query("INSERT INTO thecamp_cinema SET ? ", [req.body], (err, rows) => {
       
            if (err) {
                console.log("error at post ")
            }
            else {
                res.send("Added Successfuly");
            }


        })



    })


})


app.delete('/cinema/movies/:id', (req, res) => {

    pool.getConnection((err,connection)=>{
        connection.release()
        if(err) throw err
        connection.query("DELETE FROM thecamp_cinema WHERE id =?",[req.params.id],(err,rows)=>{

            if(err)
            {
console.log("error at delete request")
            }
            else
            {
                res.send("Deleted successfully")
            }

        })
    })

})

app.put('/cinema/movies', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err

        const {movie_name, movie_length, movie_director}=req.body
        connection.query('UPDATE thecamp_cinema SET movie_name = ?, movie_length = ?, movie_director = ? WHERE ID = ?', [movie_name, movie_length, movie_director,req.body.ID] , (err, rows) => {
          
            if(!err) {
                res.send("Updated successfully")
            } else {
                console.log(err)
            }

        })

        console.log(req.body)
    })
})

//the camp_movies_rating table

app.get('/cinema/movies/ratings', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
     
        connection.query('SELECT * from thecamp_movies_rating', (err, rows) => {
       
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            
            
        })
    })
})



app.post('/cinema/movies/ratings', (req, res) => {

    pool.getConnection((err, connection) => {

        if (err) throw err

        connection.query("INSERT INTO thecamp_movies_rating SET ? ", [req.body], (err, rows) => {
        
            if (err) {
                console.log("error at post ")
            }
            else {
                res.send("Added Successfuly");
            }


        })



    })


})














//the camp_movies_actors table

app.get('/cinema/movies/actors', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
     
        connection.query('SELECT * from thecamp_movies_actors', (err, rows) => {
       
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            
            
        })
    })
})



app.post('/cinema/movies/actors', (req, res) => {

    pool.getConnection((err, connection) => {

        if (err) throw err

        connection.query("INSERT INTO thecamp_movies_actors SET ? ", [req.body], (err, rows) => {
        
            if (err) {
                console.log("error at post ")
            }
            else {
                res.send("Added Successfuly");
            }


        })



    })


})



app.delete('/cinema/movies/actors/:id', (req, res) => {

    pool.getConnection((err,connection)=>{
        connection.release()
        if(err) throw err
        connection.query("DELETE FROM thecamp_movies_actors WHERE id =?",[req.params.id],(err,rows)=>{

            if(err)
            {
console.log("error at delete request")
            }
            else
            {
                res.send("Deleted successfully")
            }

        })
    })

})

app.put('/cinema/movies/actors', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err

        const {movie_ID, actor_name, actor_salary,ID}=req.body
        connection.query('UPDATE thecamp_movies_actors SET movie_ID = ?, actor_name=?,actor_salary = ? WHERE ID = ?', [movie_ID,actor_name,actor_salary,ID] , (err, rows) => {
          
            if(!err) {
                res.send("Updated successfully")
            } else {
                console.log(err)
            }

        })

        console.log(req.body)
    })
})







app.listen(5000, () => {

    console.log("server is running");
})