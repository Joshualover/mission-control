export const styles = {
  // 布局
  page: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    backgroundColor: '#fafafa',
    minHeight: '100vh',
    margin: 0,
    padding: 0,
  },
  
  // 渐变头部
  header: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '80px 20px 60px',
  },
  
  headerContainer: {
    maxWidth: '900px',
    margin: '0 auto',
    textAlign: 'center',
  },
  
  headerBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 24px',
    backgroundColor: 'rgba(255,255,255,0.15)',
    backdropFilter: 'blur(10px)',
    borderRadius: '30px',
    marginBottom: '24px',
  },
  
  headerTitle: {
    fontSize: 'clamp(36px, 6vw, 56px)',
    fontWeight: '800',
    color: 'white',
    margin: '0 0 20px',
    letterSpacing: '-1px',
    textShadow: '0 2px 20px rgba(0,0,0,0.1)',
  },
  
  headerDescription: {
    fontSize: '18px',
    color: 'rgba(255,255,255,0.9)',
    maxWidth: '600px',
    margin: '0 auto',
  },
  
  // 内容区域
  content: {
    padding: '60px 20px',
    maxWidth: '1200px',
    margin: '-40px auto 0',
    position: 'relative',
    zIndex: 10,
  },
  
  // 卡片
  card: {
    backgroundColor: 'white',
    padding: '36px',
    borderRadius: '20px',
    border: '1px solid rgba(0,0,0,0.06)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    transition: 'all 0.3s ease',
  },
  
  // 按钮
  buttonPrimary: {
    padding: '14px 28px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '12px',
    color: 'white',
    fontSize: '15px',
    fontWeight: '700',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(102,126,234,0.3)',
    transition: 'all 0.3s ease',
  },
  
  buttonSecondary: {
    padding: '14px 28px',
    backgroundColor: 'white',
    borderRadius: '12px',
    color: '#667eea',
    fontSize: '15px',
    fontWeight: '700',
    border: '2px solid #e5e7eb',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  
  // 文本
  titleLarge: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '16px',
  },
  
  titleMedium: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '12px',
  },
  
  textBody: {
    fontSize: '15px',
    color: '#666',
    lineHeight: '1.7',
  },
  
  textSmall: {
    fontSize: '13px',
    color: '#9ca3af',
    fontWeight: '500',
  },
  
  // 徽章
  badge: (color: string) => ({
    padding: '6px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '700',
    backgroundColor: color,
  }),
};
