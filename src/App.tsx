import { Layout } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PrivateNavLink, PrivateRoute } from "./components/index";

const { Header, Content, Footer } = Layout;
function App() {
  const navigate = useNavigate();

  useEffect(() => {
      navigate("/");
  }, [navigate]);
  
  return (
    <>
      <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <div className="logo" />
          <PrivateNavLink />
        </Header>
        <Content className="site-layout" style={{ padding: '50px', marginTop: 64 }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
            <PrivateRoute />            
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </>
  );
}

export default App;
