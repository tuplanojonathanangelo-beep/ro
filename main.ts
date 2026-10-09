input.onButtonPressed(Button.A, function () {
    mbit_Robot.CarCtrl(mbit_Robot.CarState.Car_Stop)
    running = 0
    lastDirection = 0
    basic.showNumber(3)
    basic.pause(200)
    basic.showNumber(2)
    basic.pause(200)
    basic.showNumber(1)
    basic.pause(200)
    basic.clearScreen()
    running = 1
})
input.onButtonPressed(Button.B, function () {
    running = 0
    mbit_Robot.CarCtrl(mbit_Robot.CarState.Car_Stop)
    lastDirection = 0
    basic.showIcon(IconNames.No)
})
let rightBlack = false
let leftBlack = false
let lastDirection = 0
let running = 0
// FAST BUT CONTROLLED FORWARD SPEED
let BASE_SPEED = 100
let BLACK_SPEED = 100
// STRONGER STEERING CORRECTIONS
let TURN_FAST = 110
let TURN_SLOW = 25
// GENTLER LINE SEARCH
let SEARCH_FAST = 85
let SEARCH_SLOW = 10
mbit_Robot.CarCtrl(mbit_Robot.CarState.Car_Stop)
basic.showString("MCS V10")
basic.forever(function () {
    if (running == 1) {
        leftBlack = mbit_Robot.Line_Sensor(mbit_Robot.enPos.LeftState, mbit_Robot.enLineState.Black)
        rightBlack = mbit_Robot.Line_Sensor(mbit_Robot.enPos.RightState, mbit_Robot.enLineState.Black)
        if (leftBlack && !(rightBlack)) {
            lastDirection = -1
            mbit_Robot.CarCtrlSpeed2(mbit_Robot.CarState.Car_Run, TURN_SLOW, TURN_FAST)
        } else if (!(leftBlack) && rightBlack) {
            lastDirection = 1
            mbit_Robot.CarCtrlSpeed2(mbit_Robot.CarState.Car_Run, TURN_FAST, TURN_SLOW)
        } else if (leftBlack && rightBlack) {
            mbit_Robot.CarCtrlSpeed2(mbit_Robot.CarState.Car_Run, BLACK_SPEED, BLACK_SPEED)
        } else {
            if (lastDirection == -1) {
                mbit_Robot.CarCtrlSpeed2(mbit_Robot.CarState.Car_Run, SEARCH_SLOW, SEARCH_FAST)
            } else if (lastDirection == 1) {
                mbit_Robot.CarCtrlSpeed2(mbit_Robot.CarState.Car_Run, SEARCH_FAST, SEARCH_SLOW)
            } else {
                mbit_Robot.CarCtrl(mbit_Robot.CarState.Car_Stop)
            }
        }
        basic.pause(2)
    }
})
