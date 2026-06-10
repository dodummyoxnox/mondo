# Fix Next.js Dynamic Route

Error:
You cannot use different slug names for the same dynamic path ('lessonId' !== 'quizId').

Penyebab:
Folder lama `app/quizzes/[lessonId]` masih ada, sedangkan sistem kuis baru memakai `app/quizzes/[quizId]`.

Fix:
Folder lama `app/quizzes/[lessonId]` sudah dihapus.
Route yang dipakai sekarang:
- `/quizzes`
- `/quizzes/[quizId]`
