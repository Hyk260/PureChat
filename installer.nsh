; 安装时注册协议
!macro customInstall
  DeleteRegKey HKCR "pure"
  WriteRegStr HKCR "pure" "" "URL:pure"
  WriteRegStr HKCR "pure" "URL Protocol" ""
  WriteRegStr HKCR "pure\shell" "" ""
  WriteRegStr HKCR "pure\shell\Open" "" ""
  WriteRegStr HKCR "pure\shell\Open\command" "" "$INSTDIR\${APP_EXECUTABLE_FILENAME} %1"
!macroend

; 卸载时删除协议
!macro customUnInstall
  DeleteRegKey HKCR "pure"
!macroend