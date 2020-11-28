export const state = () => ({
  user: {
    id: 'xxx',
    image: '',
    name: null,
    email: '',
    edu: '',
    program: '',
  },
  icons: {
    notes: 'mdi-note',
    labs: 'mdi-flask',
    sources: 'mdi-link-variant',
  },
  colors: {
    notes: '#f3bb45',
    labs: '#7ac29a',
    sources: '#68b3c8',
  },
  project: {},
})

export const mutations = {
  SET_PROJECT(state, project) {
    state.project = Object.assign({}, project)
  },
  SET_USER(state, user) {
    if (state.user.name === null) {
      state.user.name = user.FirstName + ' ' + user.LastName
      state.user.email = user.Email
      state.user.edu = user.EduName
      state.user.program = user.EduProgram
      state.user.id = user.Email
      state.user.image = `https://picsum.photos/200/?lock=${123}`
    }
  },
}
