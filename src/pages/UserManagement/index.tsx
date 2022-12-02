import BasicLayout, { Body, Header } from '@/components/BasicLayout';
import React from 'react';

const UserManagement: React.FC = () => {
    return <BasicLayout>
      <Header>User</Header>
      <Body>
        <div>
        User Management
        </div>
      </Body>
    </BasicLayout>
}

export default UserManagement