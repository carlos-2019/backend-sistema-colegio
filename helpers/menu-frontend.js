const getMenuFrontEnd = (role = 'ALUMNO_ROLE') =>{

    let menu = [
          {
            titulo: 'Horario',
            icono: 'content_paste',
            link: '/horario'
          },
          {
            titulo: 'Matricula',
            icono: 'library_books',
            link: '/matricula'
          }
    ];
    if (role === 'PROFESOR_ROLE') {
        menu = [
             {
               titulo: 'Horario',
               icono: 'content_paste',
               link: '/horario'
             }
       ];
    }
    if (role === 'DIRECTOR_ROLE') {
        menu = [
            {
                titulo: 'Dashboard',
                icono: 'dashboard',
                link: '/'
              },
              {
                titulo: 'Alumno',
                icono: 'person',
                link: '/alumno'
              },
              {
                titulo: 'Profesor',
                icono: 'person',
                link: '/profesor'
              },
              {
                titulo: 'Horario',
                icono: 'content_paste',
                link: '/horario'
              },
              {
                titulo: 'Matricula',
                icono: 'library_books',
                link: '/matricula'
              }
        ];
    }
    if (role === 'ADMIN_ROLE') {
        menu = [
            {
                titulo: 'Dashboard',
                icono: 'dashboard',
                link: '/'
              },
              {
                titulo: 'Alumno',
                icono: 'person',
                link: '/alumno'
              },
              {
                titulo: 'Profesor',
                icono: 'person',
                link: '/profesor'
              },
              {
                titulo: 'Horario',
                icono: 'content_paste',
                link: '/horario'
              },
              {
                titulo: 'Matricula',
                icono: 'library_books',
                link: '/matricula'
              }
        ];
    }
    if (role === 'PERSONAL_ROLE') {
      menu = [
          {
            titulo: 'Alumno',
            icono: 'person',
            link: '/alumno'
          },
          {
            titulo: 'Profesor',
            icono: 'person',
            link: '/profesor'
          },
          {
            titulo: 'Horario',
            icono: 'content_paste',
            link: '/horario'
          },
          {
            titulo: 'Matricula',
            icono: 'library_books',
            link: '/matricula'
          }
      ];
    }
    if (role === 'DIRECTOR_ROLE') {
      menu = [
          {
            titulo: 'Dashboard',
            icono: 'dashboard',
            link: '/'
          },
          {
            titulo: 'Alumno',
            icono: 'person',
            link: '/alumno'
          },
          {
            titulo: 'Profesor',
            icono: 'person',
            link: '/profesor'
          },
          {
            titulo: 'Horario',
            icono: 'content_paste',
            link: '/horario'
          },
          {
            titulo: 'Matricula',
            icono: 'library_books',
            link: '/matricula'
          }
    ];
    }
    return menu;
}

module.exports = {
    getMenuFrontEnd
}