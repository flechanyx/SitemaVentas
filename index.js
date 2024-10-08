import express from 'express'
import morgan from 'morgan';
import { engine } from 'express-handlebars';
import { join, dirname } from 'path'
import { fileURLToPath } from 'url';

//intianilization

const app = express ();
const __dirname = dirname(fileURLToPath(import.meta.url));

//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', join(__dirname, 'views'));
app.engine('.hbs',engine({
    defaultLayout: 'main',
    layoutsDir: join(app.get('views'),'layouts'),
    partialsDir: join(app.get('views'),'partials'),
    extname: '.hbs'
}));
app.set('view engine','.hbs');

//MiddLewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//routes
app.get('/',(req, res)=>{
    res.render('index')
})

//public
app.use(express.static(join(__dirname,'public')));

//run Server
app.listen(app.get('port'),()=>
console.log('server listening on port', app.get('port')));