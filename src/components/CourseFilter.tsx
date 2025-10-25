import { useBooks } from "../context/BooksContext";
import { MenuItem, Select, Typography, Card, CardContent } from "@mui/material";
import { useState } from "react";

export default function CourseFilter() {
    const { books } = useBooks();
    const [selected, setSelected] = useState("");

    const courses = [...new Set(books.map(book => book.course))];

    const filteredBooks = selected === "" 
        ? books 
        : books.filter(book => book.course === selected);

    return (
        <>
            <Typography variant="h5" gutterBottom>Filtrar por Disciplina</Typography>
            <Select 
                value={selected} 
                onChange={e => setSelected(e.target.value)} 
                sx={{ mb: 2 }}
                fullWidth
                displayEmpty
            >
                <MenuItem value="">Todas as Disciplinas</MenuItem>
                {courses.map(course => (
                    <MenuItem key={course} value={course}>{course}</MenuItem>
                ))}
            </Select>
            
            {filteredBooks.map((book, idx) => (
                <Card key={idx} sx={{ marginBottom: 2 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            {book.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {book.author} - {book.publisher} ({book.year})
                        </Typography>
                        <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
                            Disciplina: {book.course}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </>
    );
}