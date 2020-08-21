import {Modal, Text, TouchableOpacity, View} from 'react-native';
import {Picker} from '@react-native-community/picker';
import React from 'react';

function getPicker() {
    return (
        <Modal >
            <View style={{position: 'absolute', bottom: 0}}>
                <Picker
                    selectedValue={'java1'}
                    style={{height: 200, backgroundColor: 'white', width: SCREEN_W}}
                    onValueChange={(itemValue, itemIndex) => {

                    }}
                >
                    <Picker.Item label="Java1111" value="java1"/>
                    <Picker.Item label="JavaScr111ipt" value="js"/>
                    <Picker.Item label="Java1111" value="java1"/>
                    <Picker.Item label="JavaScr111ipt" value="js"/>

                </Picker>
                <View style={{
                    width: SCREEN_W,
                    position: 'absolute',
                    top: 0,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    <TouchableOpacity>
                        <Text style={{color:'blue'}}>CANCEL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{color:'blue'}}>OPEN</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

