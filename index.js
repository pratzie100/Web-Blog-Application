import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Dummy Data for Posts (not persisted)
let posts = [];

// Routes
app.get('/', (req, res) => {
    res.render('home', { posts });
});

app.post('/posts', (req, res) => {
    const { title, content } = req.body;
    posts.push({ title, content });
    res.redirect('/');
});

app.get('/posts/:id/edit', (req, res) => {
    const id = req.params.id;
    const post = posts[id];
    res.render('edit', { id, post });
});

app.post('/posts/:id/update', (req, res) => {
    const id = req.params.id;
    const { title, content } = req.body;
    posts[id] = { title, content };
    res.redirect('/');
});

app.post('/posts/:id/delete', (req, res) => {
    const id = req.params.id;
    posts.splice(id, 1);
    res.redirect('/');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
