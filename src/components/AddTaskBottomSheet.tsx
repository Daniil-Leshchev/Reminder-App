import { View, StyleSheet, TextInput, Keyboard, TouchableHighlight } from 'react-native';
import Text from "@/components/StyledText";
import React, { forwardRef, useCallback, useMemo, useState } from 'react';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { Switch } from 'react-native-switch';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import 'moment/locale/ru';
import DropDownPicker from 'react-native-dropdown-picker';

// interface Props {
//   title: string;
// }

const colors = {
  background: '#C0CEFF',
  group: '#8A9DCDB5',
  divider: '#7580B8B5',
  shadow: '#5B64AE33',
  datePickerAccent: '#363876',
  datePickerContainer: '#7B8BB5E5'
}

type Ref = BottomSheet;

const AddTaskBottomSheet = forwardRef<Ref>((_props, ref) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [isAllDay, setIsAllDay] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);

  const [repeatDropdownOpen, setRepeatDropdownOpen] = useState(false);
  const [repeatValue, setRepeatValue] = useState('');

  const [reminderDropdownOpen, setReminderDropdownOpen] = useState(false);
  const [reminderValue, setReminderValue] = useState('');

  const dateFormat = "D MMMM[,] yyyy";
  const timeFormat = "LT";

  const formatDate = (date: Date, format: string) => {
    return moment(date).local().format(format);
  }

  const showStartDatePicker = () => {
    setStartDatePickerVisibility(true);
  };

  const hideStartDatePicker = () => {
    setStartDatePickerVisibility(false);
  };

  const showEndDatePicker = () => {
    setEndDatePickerVisibility(true);
  };

  const hideEndDatePicker = () => {
    setEndDatePickerVisibility(false);
  };

  const handleConfirmStart = (date: Date) => {
    setStartDate(date);
    hideStartDatePicker();
  };

  const handleConfirmEnd = (date: Date) => {
    setEndDate(date);
    hideEndDatePicker();
  };

  //TODO:
  // const checkDates = () => {
  //   console.warn(startDate > endDate);
  // }

  const CustomCancelButton = ({ onPress }) => {
    return (
      <TouchableHighlight
        style={styles.cancelButton}
        onPress={onPress}
        activeOpacity={0.6}
        underlayColor="#DDDDDD">
        <Text style={[styles.text, styles.cancelText]}>Отменить</Text>
      </TouchableHighlight>
    )
  }

  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop appearsOnIndex={2} disappearsOnIndex={-1} {...props}/>, []
  )

  const snapPoints = useMemo(() => ['25%', '50%', '85%'], []);
  const hideKeyboardOnFocusChange = () => {
    Keyboard.dismiss();
    return false;
  }
  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={{ marginBottom: 8 }}
      backgroundStyle={styles.container}>
      <View style={styles.wrapper} onStartShouldSetResponder={hideKeyboardOnFocusChange}>
        <View style={styles.group}>
          <TextInput
            style={[styles.text, styles.divider]}
            placeholder='Название'
            placeholderTextColor='#fff'
            onChangeText={setTitle}
            value={title}
          />
          <Text style={styles.text}>Тип</Text>
        </View>

        <View style={styles.group}>
          <View style={[styles.groupElement, styles.divider]}>
            <Text style={styles.text}>Весь день</Text>
            <Switch
              value={isAllDay}
              onValueChange={() => setIsAllDay((previousState) => !previousState)}
              barHeight={24}
              backgroundActive='#73D877DB'
              backgroundInactive='#43434429'
              circleSize={20}
              switchLeftPx={2}
              switchRightPx={2}
              circleBorderWidth={0}
              renderActiveText={false}
              renderInActiveText={false}
            />
          </View>
          <View style={[styles.groupElement, styles.divider]}>
            <Text style={styles.text}>Начало</Text>
            <View style={styles.chooseDateAndTime}>
              <Text onPress={showStartDatePicker} style={[styles.text, styles.date]}>{formatDate(startDate, dateFormat)}</Text>
              <Text onPress={showStartDatePicker} style={styles.text}>{formatDate(startDate, timeFormat)}</Text>
            </View>
            <DateTimePickerModal
              locale='ru_RU'
              isVisible={isStartDatePickerVisible}
              mode="datetime"
              display='inline'
              confirmTextIOS='Подтвердить'
              cancelTextIOS='Отменить'
              customCancelButtonIOS={CustomCancelButton}
              onConfirm={handleConfirmStart}
              onCancel={hideStartDatePicker}
              buttonTextColorIOS={'#fff'}
              accentColor={colors.datePickerAccent}
              pickerContainerStyleIOS={styles.datePicker}
              pickerComponentStyleIOS={{marginBottom: 12}}
            />
          </View>
          <View style={styles.groupElement}>
            <Text style={styles.text}>Конец</Text>
            <View style={styles.chooseDateAndTime}>
              <Text onPress={showEndDatePicker} style={[styles.text, styles.date]}>{formatDate(endDate, dateFormat)}</Text>
              <Text onPress={showEndDatePicker} style={styles.text}>{formatDate(endDate, timeFormat)}</Text>
            </View>
            <DateTimePickerModal
              locale='ru_RU'
              isVisible={isEndDatePickerVisible}
              mode="datetime"
              display='inline'
              confirmTextIOS='Подтвердить'
              cancelTextIOS='Отменить'
              customCancelButtonIOS={CustomCancelButton}
              onConfirm={handleConfirmEnd}
              onCancel={hideEndDatePicker}
              buttonTextColorIOS={'#fff'}
              accentColor={colors.datePickerAccent}
              pickerContainerStyleIOS={styles.datePicker}
              pickerComponentStyleIOS={{marginBottom: 12}}
            />
          </View>
        </View>

        <View style={[styles.group, styles.dropdownGroup]}>
          <Text style={styles.text}>Повтор</Text>
          <DropDownPicker
            open={repeatDropdownOpen}
            value={repeatValue}
            setOpen={setRepeatDropdownOpen}
            setValue={setRepeatValue}
            placeholder='Никогда'
            containerStyle={styles.dropdownContainer}
            style={styles.dropdown}
            textStyle={[styles.text, styles.dropdownText]}
            listItemContainerStyle={styles.dropdownItem}
            showTickIcon={false}
            dropDownContainerStyle={styles.dropdownItemsContainer}
            items={[
              {label: 'Никогда', value: 'never'},
              {label: 'Каждый день', value: 'everyDay'},
              {label: 'Каждую неделю', value: 'everyWeek'},
              {label: 'Каждые две недели', value: 'everyTwoWeeks'},
              {label: 'Каждый месяц', value: 'everyMonth'},
              {label: 'Каждый год', value: 'everyYear'},
            ]}
          />
        </View>

        <View style={[styles.group, styles.dropdownGroup, {zIndex: -1}]}>
          <Text style={styles.text}>Напоминание</Text>
          <DropDownPicker
            open={reminderDropdownOpen}
            value={reminderValue}
            setOpen={setReminderDropdownOpen}
            setValue={setReminderValue}
            placeholder='Нет'
            containerStyle={styles.dropdownContainer}
            style={styles.dropdown}
            textStyle={[styles.text, styles.dropdownText]}
            listItemContainerStyle={styles.dropdownItem}
            showTickIcon={false}
            dropDownContainerStyle={styles.dropdownItemsContainer}
            items={[
              {label: 'Нет', value: 'no'},
              {label: 'В момент события', value: 'atTheMoment'},
              {label: 'За 5 минут', value: '5m'},
              {label: 'За 10 минут', value: '10m'},
              {label: 'За 30 минут', value: '30m'},
              {label: 'За 1 час', value: '1h'},
              {label: 'За 2 часа', value: '2h'},
              {label: 'За 1 день', value: '1d'},
              {label: 'За 2 дня', value: '2d'},
              {label: 'За неделю', value: '1w'},
            ]}
          />
        </View>
      </View>
    </BottomSheet>
  );
})

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    backgroundColor: colors.background,
  },

  wrapper: {
    paddingHorizontal: 25,
    flex: 1
  },

  group: {
    backgroundColor: colors.group,
    borderRadius: 20,
    paddingHorizontal: 25,
    paddingVertical: 15,
    marginBottom: 18,
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 4,
    shadowOpacity: 1,
  },

  text: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Inter'
  },

  divider: {
    borderBottomColor: colors.divider,
    borderBottomWidth: 1,
    paddingBottom: 15,
    marginBottom: 10
  },

  groupElement: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  datePicker: {
    backgroundColor: colors.datePickerContainer,
    borderRadius: 20,
    marginBottom: 16,
  },

  cancelButton: {
    backgroundColor: colors.datePickerContainer,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    height: 56
  },

  cancelText: {
    fontSize: 20
  },

  chooseDateAndTime: {
    flexDirection: 'row',
  },

  date: {
    marginRight: 12
  },

  dropdownGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  dropdown: {
    borderWidth: 0,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    height: 24
  },

  dropdownContainer: {
    maxWidth: '85%',
    position: 'absolute',
    right: 16,
    bottom: 26
  },

  dropdownItem: {
    backgroundColor: colors.datePickerContainer,
    borderBottomWidth: 1,
    borderBottomColor: '#717794',
  },

  dropdownItemsContainer: {
    alignSelf: 'flex-end',
    borderWidth: 0,
    width: 185,
    borderRadius: 20,
    backgroundColor: colors.datePickerContainer,
  },

  dropdownText: {
    textAlign: 'right',
  }
})

export default AddTaskBottomSheet;