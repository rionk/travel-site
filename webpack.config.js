const path = require('path');

module.exports ={
	entry:'./app/assets/scripts/App.js',
	output:{
		filename: 'bundled.js',
		path: path.resolve(__dirname, 'app'),
	},
	mode:'development',
	devtool: 'eval-source-map',
	devServer:{
		watchFiles: ["app/**/*.html"],
		static : {
			directory: path.resolve(__dirname, 'app'),
			// 정적 파일의 변경을 감지할지 여부를 설정
			// 이 값이 false로 설정되어 있어, 정적 파일이 변경되더라도 서버가 자동으로 다시 시작되지 않습니다.
			watch: false
		},
		hot: true,
		port: 3000
	},
	//watch: true,
	module:{
		rules:[
			{
				test: /\.(css|scss)$/,
				use: [
					'style-loader', // CSS를 DOM에 삽입
					'css-loader',   // CSS를 모듈로 해석
					'sass-loader'   // SASS를 CSS로 변환
				],
			}
		]
	}
}