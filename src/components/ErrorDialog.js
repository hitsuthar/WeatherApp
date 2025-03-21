import React from 'react';
import { Dialog, Paragraph, Button } from 'react-native-paper';

const ErrorDialog = ({ visible, message, onDismiss }) => (
    <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Error</Dialog.Title>
        <Dialog.Content>
            <Paragraph>{message}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
            <Button onPress={onDismiss}>OK</Button>
        </Dialog.Actions>
    </Dialog>
);

export default ErrorDialog;