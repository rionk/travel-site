const path = require('path')

module.exports = {
    // 번들링할 파일의 시작점을 지정
    entry: './app/assets/scripts/App.js',
    output: {
        filename: 'bundled.js',
        // 번들링된 파일의 이름과 경로를 지정
        path: path.resolve(__dirname, 'app'),
    },
    // devServer는 개발 서버의 설정을 지정
    devServer: {
        // 개발 서버의 정적 파일 경로를 지정
        static: {
            directory: path.join(__dirname, "app"),
            watch: false
        },
        // 개발 서버가 감시할 파일을 지정
        // 여기서는 "app/**/*.html"로 설정되어 모든 html 파일을 감시합니다.
        watchFiles: ["app/**/*.html"],
        hot: true,
        port: 3000,
    },
    mode: "development",
    // 번들링된 코드가 실행될 환경을 지정
    target: ['web', 'es5'],
    //watch: true,

    module: {
        rules: [
            {
                test: /\.(css|scss)/i,
                use: [
                    'style-loader', 'css-loader', {
                        loader: 'sass-loader',
                    }
                ]
            }
        ]
    }
}