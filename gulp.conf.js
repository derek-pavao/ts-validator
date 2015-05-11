module.exports = {
    src: {
        ts: 'src/**/*.ts',
        html: [
            'src/**/*.html',
            '!src/jspm_packages/**/*.html',
            '!src/index.html'
        ],
        scss: 'src/scss/main.scss'
    }
};
