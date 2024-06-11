export const white_list_url = [
	'/',
	'/pages/public/login',
	"/pages/index/index",
	"/pages/cart/cart",
	"/pages/user/user",
	"/pages/category/category",
]

export default function() {
	const list = ['navigateTo', 'redirectTo', 'reLaunch', 'switchTab']
	list.forEach(v => {
		uni.addInterceptor(v, {
			invoke(e) {
				
				console.log('e', e)
				const url = e.url.split("?")[0]
				let pass = white_list_url.some((item) => {
					if (typeof(item) === 'object' && item.pattern) {
						return item.pattern.test(url)
					}
					return url === item
				})
				if (pass) {
					return e
				}

				const token = uni.getStorageSync('token');
				if (!token) {
					uni.navigateTo({
						url: '/pages/public/login'
					})
					return false
				}
				return e
			},
			success(res) {
				console.log('invoke-success', res)
			},
			fail(err) {
				console.log("err", err)
			}
		})
	})
}