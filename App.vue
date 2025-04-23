<script>
	export default {
		globalData: {
			isCheckingLogin: false, // 防止重复检查导致循环跳转
			lastPage: '', // 记录登录前的页面路径，方便登录后返回
			lastPageQuery: {} // 记录页面参数
		},
		onLaunch: function() {
			console.log('App Launch')
			// 初始化时检查登录状态
			this.checkLoginStatus();
			
			// 添加请求拦截器全局处理登录过期
			this.setupRequestInterceptor();
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			// 检查登录状态
			checkLoginStatus() {
				const token = uni.getStorageSync('token');
				if (!token) {
					console.log('未检测到登录状态，需要登录');
					// 首次启动不跳转，等待页面自身检查
					return false;
				}
				return true;
			},
			
			// 设置请求拦截器
			setupRequestInterceptor() {
				// 添加拦截器
				uni.addInterceptor('request', {
					// 请求成功回调
					success: (res) => {
						// 根据后端接口规范判断登录是否过期
						// 假设 code=401 表示未登录或 token 过期
						if (res.data && (res.data.code === 401 || res.data.code === -1 && res.data.msg?.includes('登录'))) {
							console.log('接口返回登录过期');
							// 避免重复弹窗和跳转
							if (!this.globalData.isCheckingLogin) {
								this.handleLoginExpired();
							}
						}
						return res;
					},
					// 请求失败回调
					fail: (err) => {
						console.error('请求失败:', err);
						// 某些情况下可能需要根据错误判断是否登录过期
						return err;
					}
				});
			},
			
			// 处理登录过期
			handleLoginExpired() {
				// 设置正在检查标志，防止重复弹窗和跳转
				this.globalData.isCheckingLogin = true;
				
				// 获取当前页面路径，供登录后返回使用
				const pages = getCurrentPages();
				if (pages.length > 0) {
					const currentPage = pages[pages.length - 1];
					this.globalData.lastPage = `/${currentPage.route}`;
					this.globalData.lastPageQuery = currentPage.options || {};
				}
				
				// 清除登录信息
				uni.removeStorageSync('token');
				uni.removeStorageSync('userInfo');
				
				// 显示提示
				uni.showToast({
					title: '登录已过期，请重新登录',
					icon: 'none',
					duration: 2000
				});
				
				// 延迟跳转到登录页，等待 Toast 显示完成
				setTimeout(() => {
					uni.reLaunch({
						url: '/pages/login/index'
					});
					
					// 完成检查后重置标志
					setTimeout(() => {
						this.globalData.isCheckingLogin = false;
					}, 500);
				}, 1500);
			}
		}
	}
</script>

<style lang="scss">
/* 导入主题变量 */
@import '@/uni_modules/styles/theme.scss';

/* 全局样式重置 */
page {
  background-color: $color-background;
  color: $color-text-primary;
  font-family: 'PingFang SC', 'Helvetica Neue', Arial, sans-serif;
}

/* 全局按钮样式 */
button {
  background-color: $color-primary;
  color: #fff;
  border: $border-width solid darken($color-primary, 10%);
  border-radius: $border-radius-md;
  font-weight: normal;
  
  &:after {
    border: none;
  }
  
  &.button-hover {
    background-color: darken($color-primary, 5%);
  }
  
  &[disabled] {
    background-color: #ccc;
    border-color: #bbb;
  }
}

/* 卡片容器通用样式 */
.card {
  background-color: #fff;
  border-radius: $border-radius-lg;
  border: $border-width solid $color-border;
  padding: 24rpx;
  margin-bottom: 20rpx;
  box-shadow: $box-shadow;
}

/* 标签通用样式 */
.tag {
  display: inline-block;
  padding: 4rpx 16rpx;
  border-radius: $border-radius-sm;
  font-size: 22rpx;
  border: $border-width solid;
  
  &.primary {
    color: $color-primary;
    background-color: rgba($color-primary, 0.1);
    border-color: rgba($color-primary, 0.3);
  }
  
  &.secondary {
    color: $color-secondary;
    background-color: rgba($color-secondary, 0.1);
    border-color: rgba($color-secondary, 0.3);
  }
  
  &.tertiary {
    color: $color-tertiary;
    background-color: rgba($color-tertiary, 0.1);
    border-color: rgba($color-tertiary, 0.3);
  }
}
</style>
