// config/styles/organisms/NotificationBottomSheetStyles.ts
import { StyleSheet, Dimensions, Platform } from 'react-native';
import { fonts } from '../../fonts';
import { spacing, radius } from '../../styleConsts';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const notificationBottomSheetStyles = StyleSheet.create({
  bottomSheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    maxHeight: SCREEN_HEIGHT * 0.75,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  handle: {
    width: 36,
    height: 4,
    backgroundColor: '#DCDCDC',
    borderRadius: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.m,
    paddingBottom: spacing.s,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0'
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '300',
    color: '#000000',
    fontFamily: fonts.franklinGothicURW,
    letterSpacing: -0.5,
  },
  closeButton: {
    padding: 4,
  },
  optionsContainer: {
    paddingTop: 8,
  },
  bottomPadding: {
    height: Platform.OS === 'ios' ? 34 : spacing.m,
  }
});