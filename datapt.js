{
  # Timestamp in seconds since the Unix epoch.
  "ts": 1676908653.882446,

  # A list of groups which associate body ids of people in conversational group formations. Read more about body ids in the "people" field.
  # The body ids within each group are sorted in ascending order, and the groups are sorted in ascending order of the first body id. If each person remains in a group with the same people, then the output below will remain constant, but the ordering of the groups may change as people join or leave groups.
  "groups": {
      "body_ids": [
          [
              2,
              3
          ],
          [
              5
          ]
      ]
  }
  
  # There is one element in the "people" object for each person in view.
  # Object keys are an identifier for the person and values are an object with pose information for the person.
  "people": [

      # Start of the object for person with ID "2"
      # Note: Only the first person is annotated, the rest follow the same format.
      {
          # body_id is this person's identifier and unique for as long as a person is in view.
          # When a person is occluded or leaves the view of the camera, the id is re-assigned to
          # another detected person. If a previously-seen person comes back into view, a new id is assigned.
          # This value is the same as the key of this object.
          "body_id": 2,

          # These four fields serve as inputs to the group detection model, and you may also find them useful. 
          # x_pos measures left/right position in meters relative to the camera, where the positive axis points right when looking at the display. 
          # y_pos measures toward/away position in meters relative to the camera, where the positive axis points away from the camera.
          # head_angle measures the bearing of the head in radians, where the scale imitates the unit circle in the [-pi,pi] range: counterclockwise is the positive direction, and 0 radians indicates facing directly to the right of the display, pi/2 radians indicates facing the display, pi/-pi radians indicates facing directly to the left of the display, and -pi/2 radians indicates facing away from the display.
          # body_angle measures the bearing of the lower body (more specifically, pelvis) in radians, using the same scale as head_angle.
          "x_pos": 0.539672119140625,
          "y_pos": -1.581201171875,
          "head_angle": 2.335923179048785,
          "body_angle": 2.1822310773676343

          # An object containing all the detected keypoints for this person.
          # The key is the name of the joint and the value has 3D position and confidence information.
          # Note: Only the first keypoint is annotated, the rest follow the same format.
          # The ID of this array corresponds to the joints listed here: https://learn.microsoft.com/en-us/azure/kinect-dk/body-joints#joint-hierarchy
          # For example, joints[0] is the PELVIS, joints[1] SPINE_NAVEL, joints[2] is SPINE_CHEST, etc.
          "joints": [
              {
                  # The 3D position of the joint in the depth camera's coordinate frame.
                  "position": {
                      "x": -539.672119140625,
                      "y": 651.8558959960938,
                      "z": 1581.201171875
                  },
                  # A quaternion representing the orientation of the joint in the depth camera's coordinate frame.
                  "orientation": {
                      "w": 0.6351052522659302,
                      "x": -0.31590592861175537,
                      "y": 0.33670857548713684,
                      "z": -0.6192513108253479
                  },
                  # Confidence level of the joint's position. Where values 0-4 correspond to [0=None, 1=Low, 2=Medium, 3=High]
                  "confidence": 2,
                  # The pixel location of the joint in the depth image.
                  "pixel": {
                      "x": 403,
                      "y": 701
                  },
                  # True when the joint's position is valid.
                  "valid": true
              },
              {
                  "position": {
                      "x": -540.0772705078125,
                      "y": 465.418701171875,
                      "z": 1576.6617431640625
                  },
                  "orientation": {
                      "w": 0.5808079838752747,
                      "x": -0.34308922290802,
                      "y": 0.30896422266960144,
                      "z": -0.6704422831535339
                  },
                  "confidence": 2,
                  "pixel": {
                      "x": 407,
                      "y": 620
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": -553.4849853515625,
                      "y": 317.6990661621094,
                      "z": 1591.7471923828125
                  },
                  "orientation": {
                      "w": 0.6466284394264221,
                      "x": -0.2680312693119049,
                      "y": 0.26656806468963623,
                      "z": -0.6625499725341797
                  },
                  "confidence": 2,
                  "pixel": {
                      "x": 407,
                      "y": 556
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": -558.739990234375,
                      "y": 90.83380126953125,
                      "z": 1594.8017578125
                  },
                  "orientation": {
                      "w": 0.6976779103279114,
                      "x": -0.24579106271266937,
                      "y": 0.287203848361969,
                      "z": -0.6085608005523682
                  },
                  "confidence": 2,
                  "pixel": {
                      "x": 411,
                      "y": 464
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": -534.00390625,
                      "y": 127.8033676147461,
                      "z": 1620.2298583984375
                  },
                  "orientation": {
                      "w": 0.6536831259727478,
                      "x": -0.6342764496803284,
                      "y": -0.3477779030799866,
                      "z": -0.22235608100891113
                  },
                  "confidence": 2,
                  "pixel": {
                      "x": 423,
                      "y": 477
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": -435.49554443359375,
                      "y": 150.28904724121094,
                      "z": 1730.3233642578125
                  },
                  "orientation": {
                      "w": 0.7017265558242798,
                      "x": -0.5082683563232422,
                      "y": -0.14853455126285553,
                      "z": 0.4766344726085663
                  },
                  "confidence": 2,
                  "pixel": {
                      "x": 473,
                      "y": 482
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": -290.6236877441406,
                      "y": 387.1399230957031,
                      "z": 1650.57958984375
                  },
                  "orientation": {
                      "w": 0.12855128943920135,
                      "x": -0.454805463552475,
                      "y": 0.2712034285068512,
                      "z": 0.8384957909584045
                  },
                  "confidence": 2,
                  "pixel": {
                      "x": 517,
                      "y": 578
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": -424.7600402832031,
                      "y": 379.5972595214844,
                      "z": 1448.7562255859375
                  },
                  "orientation": {
                      "w": -0.1931122988462448,
                      "x": 0.22441613674163818,
                      "y": 0.8272491097450256,
                      "z": -0.4774976670742035
                  },
                  "confidence": 2,
                  "pixel": {
                      "x": 439,
                      "y": 597
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": -508.4042053222656,
                      "y": 435.5793151855469,
                      "z": 1450.0506591796875
                  },
                  "orientation": {
                      "w": -0.1722951978445053,
                      "x": 0.25995883345603943,
                      "y": 0.8167772889137268,
                      "z": -0.4853975176811218
                  },
                  "confidence": 2,
                  "pixel": {
                      "x": 401,
                      "y": 623
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": -599.38427734375,
                      "y": 502.4382019042969,
                      "z": 1453.3360595703125
                  },
                  "orientation": {
                      "w": -0.1722951978445053,
                      "x": 0.25995883345603943,
                      "y": 0.8167772889137268,
                      "z": -0.4853975176811218
                  },
                  "confidence": 2,
                  "pixel": {
                      "x": 358,
                      "y": 655
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": -501.33489990234375,
                      "y": 477.31097412109375,
                      "z": 1476.3929443359375
                  },
                  "orientation": {
                      "w": 0.614048957824707,
                      "x": -0.17035292088985443,
                      "y": -0.42147713899612427,
                      "z": 0.6451981663703918
                  },
                  "confidence": 2,
                  "pixel": {
                      "x": 407,
                      "y": 639
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": -583.2252807617188,
                      "y": 128.89109802246094,
                      "z": 1569.9825439453125
                  },
                  "orientation": {
                      "w": 0.5811520218849182,
                      "x": 0.6876559853553772,
                      "y": -0.355526328086853,
                      "z": 0.25098326802253723
                  },
                  "confidence": 2,
                  "pixel": {
                      "x": 396,
                      "y": 480
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": -668.6251831054688,
                      "y": 156.00616455078125,
                      "z": 1465.722412109375
                  },
                  "orientation": {
                      "w": 0.10456763952970505,
                      "x": -0.6563045978546143,
                      "y": 0.659425675868988,
                      "z": -0.3514082431793213
                  },
                  "confidence": 2,
                  "pixel": {
                      "x": 340,
                      "y": 496
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": -634.2882080078125,
                      "y": 432.4034729003906,
                      "z": 1370.548828125
                  },
                  "orientation": {
                      "w": 0.32792535424232483,
                      "x": 0.032439425587654114,
                      "y": 0.9297987222671509,
                      "z": -0.16397282481193542
                  },
                  "confidence": 2,
                  "pixel": {
                      "x": 325,
                      "y": 635
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": -442.0893859863281,
                      "y": 443.9962463378906,
                      "z": 1522.8807373046875
                  },
                  "orientation": {
                      "w": 0.02820579707622528,
                      "x": -0.517371654510498,
                      "y": -0.593165397644043,
                      "z": 0.6161864399909973
                  },
                  "confidence": 2,
                  "pixel": {
                      "x": 441,
                      "y": 617
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": -392.61224365234375,
                      "y": 380.0364685058594,
                      "z": 1595.043701171875
                  },
                  "orientation": {
                      "w": 0.5087693333625793,
                      "x": 0.16166765987873077,
                      "y": -0.770313024520874,
                      "z": 0.3487620949745178
                  },
                  "confidence": 2,
                  "pixel": {
                      "x": 472,
                      "y": 581
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": -344.86773681640625,
                      "y": 368.28900146484375,
                      "z": 1495.4998779296875
                  },
                  "orientation": {
                      "w": 0.5087693333625793,
                      "x": 0.16166765987873077,
                      "y": -0.770313024520874,
                      "z": 0.3487620949745178
                  },
                  "confidence": 2,
                  "pixel": {
                      "x": 481,
                      "y": 586
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": -356.0845031738281,
                      "y": 366.18597412109375,
                      "z": 1463.363525390625
                  },
                  "orientation": {
                      "w": 0.5112571120262146,
                      "x": 0.3738313615322113,
                      "y": 0.03517773374915123,
                      "z": 0.7730645537376404
                  },
                  "confidence": 2,
                  "pixel": {
                      "x": 472,
                      "y": 589
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": -461.6146240234375,
                      "y": 650.3549194335938,
                      "z": 1635.8798828125
                  },
                  "orientation": {
                      "w": 0.6860713362693787,
                      "x": -0.15440534055233002,
                      "y": 0.28083696961402893,
                      "z": -0.6531429886817932
                  },
                  "confidence": 2,
                  "pixel": {
                      "x": 444,
                      "y": 690
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": -457.04046630859375,
                      "y": 1061.694091796875,
                      "z": 1712.734619140625
                  },
                  "orientation": {
                      "w": 0.7122848629951477,
                      "x": -0.1428070366382599,
                      "y": 0.2868848145008087,
                      "z": -0.6244626045227051
                  },
                  "confidence": 2,
                  "pixel": {
                      "x": 446,
                      "y": 853
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": -479.23199462890625,
                      "y": 1450.2474365234375,
                      "z": 1804.8536376953125
                  },
                  "orientation": {
                      "w": 0.8266779780387878,
                      "x": -0.07341790944337845,
                      "y": 0.29428496956825256,
                      "z": -0.4739299714565277
                  },
                  "confidence": 2,
                  "pixel": {
                      "x": 442,
                      "y": 994
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": -408.231689453125,
                      "y": 1632.2862548828125,
                      "z": 1791.788818359375
                  },
                  "orientation": {
                      "w": 0.9219319224357605,
                      "x": 0.15675145387649536,
                      "y": 0.25531283020973206,
                      "z": 0.24553188681602478
                  },
                  "confidence": 2,
                  "pixel": {
                      "x": 466,
                      "y": 1078
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": -610.06005859375,
                      "y": 653.2094116210938,
                      "z": 1531.89501953125
                  },
                  "orientation": {
                      "w": 0.5988819003105164,
                      "x": 0.4043990671634674,
                      "y": 0.34082281589508057,
                      "z": 0.6013665199279785
                  },
                  "confidence": 2,
                  "pixel": {
                      "x": 364,
                      "y": 712
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": -591.5009765625,
                      "y": 1069.5491943359375,
                      "z": 1564.5679931640625
                  },
                  "orientation": {
                      "w": 0.5722728371620178,
                      "x": 0.4188692569732666,
                      "y": 0.32288339734077454,
                      "z": 0.6267365217208862
                  },
                  "confidence": 2,
                  "pixel": {
                      "x": 366,
                      "y": 903
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": -589.118408203125,
                      "y": 1468.7740478515625,
                      "z": 1627.4075927734375
                  },
                  "orientation": {
                      "w": 0.440068781375885,
                      "x": 0.370238721370697,
                      "y": 0.15382342040538788,
                      "z": 0.803493082523346
                  },
                  "confidence": 2,
                  "pixel": {
                      "x": 370,
                      "y": 1071
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": -540.30029296875,
                      "y": 1638.9097900390625,
                      "z": 1593.7376708984375
                  },
                  "orientation": {
                      "w": -0.2543056607246399,
                      "x": 0.37633371353149414,
                      "y": -0.14998990297317505,
                      "z": 0.8781825304031372
                  },
                  "confidence": 2,
                  "pixel": {
                      "x": 382,
                      "y": 1173
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": -550.6847534179688,
                      "y": 6.268575668334961,
                      "z": 1586.126708984375
                  },
                  "orientation": {
                      "w": 0.7878490686416626,
                      "x": -0.16237811744213104,
                      "y": 0.42591553926467896,
                      "z": -0.4141535460948944
                  },
                  "confidence": 2,
                  "pixel": {
                      "x": 414,
                      "y": 430
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": -457.3705749511719,
                      "y": 60.29938888549805,
                      "z": 1457.331787109375
                  },
                  "orientation": {
                      "w": 0.7878490686416626,
                      "x": -0.16237811744213104,
                      "y": 0.42591553926467896,
                      "z": -0.4141535460948944
                  },
                  "confidence": 2,
                  "pixel": {
                      "x": 433,
                      "y": 454
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": -446.0447998046875,
                      "y": 6.681870460510254,
                      "z": 1477.83154296875
                  },
                  "orientation": {
                      "w": 0.8499442338943481,
                      "x": 0.1863490641117096,
                      "y": 0.41598638892173767,
                      "z": 0.26424267888069153
                  },
                  "confidence": 2,
                  "pixel": {
                      "x": 442,
                      "y": 431
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": -459.7961730957031,
                      "y": -54.26100158691406,
                      "z": 1594.698974609375
                  },
                  "orientation": {
                      "w": 0.4141535460948944,
                      "x": 0.42591553926467896,
                      "y": 0.16237811744213104,
                      "z": 0.7878490686416626
                  },
                  "confidence": 2,
                  "pixel": {
                      "x": 452,
                      "y": 407
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": -489.5533447265625,
                      "y": 18.129627227783203,
                      "z": 1446.7994384765625
                  },
                  "orientation": {
                      "w": 0.8499442338943481,
                      "x": 0.1863490641117096,
                      "y": 0.41598638892173767,
                      "z": 0.26424267888069153
                  },
                  "confidence": 2,
                  "pixel": {
                      "x": 418,
                      "y": 436
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": -603.553466796875,
                      "y": -36.72516632080078,
                      "z": 1499.2686767578125
                  },
                  "orientation": {
                      "w": 0.7878490686416626,
                      "x": -0.16237811744213104,
                      "y": 0.42591553926467896,
                      "z": -0.4141535460948944
                  },
                  "confidence": 2,
                  "pixel": {
                      "x": 379,
                      "y": 413
                  },
                  "valid": true
              }
          ],
      },
      {
          "body_id": 3,
          "x_pos": -0.9719134521484375,
          "y_pos": -1.4816478271484375,
          "head_angle": 0.8501802108715988,
          "body_angle": 0.6271526131941667
          "joints": [
              {
                  "position": {
                      "x": 971.9134521484375,
                      "y": 707.9566650390625,
                      "z": 1481.6478271484375
                  },
                  "orientation": {
                      "w": 0.27590328454971313,
                      "x": -0.6503124237060547,
                      "y": 0.6897546052932739,
                      "z": -0.15877549350261688
                  },
                  "confidence": 2,
                  "pixel": {
                      "x": 1067,
                      "y": 754
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": 973.7332153320312,
                      "y": 528.9251708984375,
                      "z": 1451.59423828125
                  },
                  "orientation": {
                      "w": -0.26410481333732605,
                      "x": 0.6970267295837402,
                      "y": -0.642511785030365,
                      "z": 0.17771023511886597
                  },
                  "confidence": 2,
                  "pixel": {
                      "x": 1070,
                      "y": 673
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": 989.8770141601562,
                      "y": 385.3031005859375,
                      "z": 1438.2972412109375
                  },
                  "orientation": {
                      "w": -0.1467670500278473,
                      "x": 0.7603663206100464,
                      "y": -0.6087686419487,
                      "z": 0.17234627902507782
                  },
                  "confidence": 2,
                  "pixel": {
                      "x": 1075,
                      "y": 606
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": 1034.76611328125,
                      "y": 169.80715942382812,
                      "z": 1457.136474609375
                  },
                  "orientation": {
                      "w": -0.16011537611484528,
                      "x": 0.7090982794761658,
                      "y": -0.6677842736244202,
                      "z": 0.16002148389816284
                  },
                  "confidence": 2,
                  "pixel": {
                      "x": 1081,
                      "y": 505
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": 1043.4608154296875,
                      "y": 205.81051635742188,
                      "z": 1423.7308349609375
                  },
                  "orientation": {
                      "w": 0.5195874571800232,
                      "x": -0.6850594282150269,
                      "y": 0.41717395186424255,
                      "z": 0.29442891478538513
                  },
                  "confidence": 2,
                  "pixel": {
                      "x": 1098,
                      "y": 524
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": 1113.075439453125,
                      "y": 167.17198181152344,
                      "z": 1301.9854736328125
                  },
                  "orientation": {
                      "w": -0.2054315209388733,
                      "x": 0.7997512817382812,
                      "y": -0.37848982214927673,
                      "z": -0.41825971007347107
                  },
                  "confidence": 2,
                  "pixel": {
                      "x": 1178,
                      "y": 515
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": 1215.324462890625,
                      "y": 45.255714416503906,
                      "z": 1070.1268310546875
                  },
                  "orientation": {
                      "w": -0.12608806788921356,
                      "x": 0.7177522778511047,
                      "y": -0.5173860192298889,
                      "z": -0.4486035406589508
                  },
                  "confidence": 2,
                  "pixel": {
                      "x": 1351,
                      "y": 459
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": 1229.9888916015625,
                      "y": -103.33757781982422,
                      "z": 887.34326171875
                  },
                  "orientation": {
                      "w": 0.3404236435890198,
                      "x": 0.7083420157432556,
                      "y": -0.4729039669036865,
                      "z": -0.3984033167362213
                  },
                  "confidence": 2,
                  "pixel": {
                      "x": 1497,
                      "y": 358
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": 1245.79150390625,
                      "y": -198.16348266601562,
                      "z": 868.3720092773438
                  },
                  "orientation": {
                      "w": 0.36547040939331055,
                      "x": 0.6762839555740356,
                      "y": -0.5177128314971924,
                      "z": -0.37555935978889465
                  },
                  "confidence": 2,
                  "pixel": {
                      "x": 1517,
                      "y": 288
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": 1265.787841796875,
                      "y": -305.3435974121094,
                      "z": 854.126953125
                  },
                  "orientation": {
                      "w": 0.36547040939331055,
                      "x": 0.6762839555740356,
                      "y": -0.5177128314971924,
                      "z": -0.37555935978889465
                  },
                  "confidence": 2,
                  "pixel": {
                      "x": 1536,
                      "y": 210
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": 1235.64794921875,
                      "y": -234.46217346191406,
                      "z": 879.675537109375
                  },
                  "orientation": {
                      "w": 0.05832274258136749,
                      "x": 0.791144847869873,
                      "y": -0.596968948841095,
                      "z": 0.11965083330869675
                  },
                  "confidence": 2,
                  "pixel": {
                      "x": 1495,
                      "y": 265
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": 1013.1543579101562,
                      "y": 205.4887237548828,
                      "z": 1485.1400146484375
                  },
                  "orientation": {
                      "w": 0.6043382883071899,
                      "x": 0.5596871376037598,
                      "y": 0.4344780743122101,
                      "z": -0.3643548786640167
                  },
                  "confidence": 2,
                  "pixel": {
                      "x": 1064,
                      "y": 520
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": 965.3856811523438,
                      "y": 199.33860778808594,
                      "z": 1609.997802734375
                  },
                  "orientation": {
                      "w": 0.6914574503898621,
                      "x": 0.22791188955307007,
                      "y": 0.5031698346138,
                      "z": -0.4655781388282776
                  },
                  "confidence": 2,
                  "pixel": {
                      "x": 1010,
                      "y": 509
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": 948.1613159179688,
                      "y": 318.1031188964844,
                      "z": 1870.1812744140625
                  },
                  "orientation": {
                      "w": 0.8108246326446533,
                      "x": 0.5245757699012756,
                      "y": 0.17304323613643646,
                      "z": 0.19349351525306702
                  },
                  "confidence": 2,
                  "pixel": {
                      "x": 953,
                      "y": 539
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": 741.3652954101562,
                      "y": 199.71678161621094,
                      "z": 1888.73095703125
                  },
                  "orientation": {
                      "w": 0.6762868762016296,
                      "x": -0.3302578926086426,
                      "y": -0.07979574799537659,
                      "z": 0.6536042094230652
                  },
                  "confidence": 2,
                  "pixel": {
                      "x": 877,
                      "y": 496
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": 736.2762451171875,
                      "y": 99.90821838378906,
                      "z": 1922.5499267578125
                  },
                  "orientation": {
                      "w": 0.8957391381263733,
                      "x": -0.2608198821544647,
                      "y": -0.2177397757768631,
                      "z": 0.2867293357849121
                  },
                  "confidence": 0,
                  "pixel": {
                      "x": 869,
                      "y": 462
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": 656.2161865234375,
                      "y": 32.11519241333008,
                      "z": 1896.55615234375
                  },
                  "orientation": {
                      "w": 0.8957391381263733,
                      "x": -0.2608198821544647,
                      "y": -0.2177397757768631,
                      "z": 0.2867293357849121
                  },
                  "confidence": 0,
                  "pixel": {
                      "x": 845,
                      "y": 439
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": 686.6856689453125,
                      "y": 78.40511322021484,
                      "z": 1892.7008056640625
                  },
                  "orientation": {
                      "w": 0.854671835899353,
                      "x": 0.1939714401960373,
                      "y": 0.34476709365844727,
                      "z": 0.3362243175506592
                  },
                  "confidence": 0,
                  "pixel": {
                      "x": 856,
                      "y": 455
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": 1026.39013671875,
                      "y": 720.9296264648438,
                      "z": 1407.665771484375
                  },
                  "orientation": {
                      "w": 0.3131222128868103,
                      "x": -0.6451455354690552,
                      "y": 0.6460157036781311,
                      "z": -0.2615441679954529
                  },
                  "confidence": 2,
                  "pixel": {
                      "x": 1118,
                      "y": 779
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": 1014.7730102539062,
                      "y": 1127.2265625,
                      "z": 1434.999267578125
                  },
                  "orientation": {
                      "w": 0.3503105640411377,
                      "x": -0.535839319229126,
                      "y": 0.739201545715332,
                      "z": -0.20914076268672943
                  },
                  "confidence": 2,
                  "pixel": {
                      "x": 1118,
                      "y": 982
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": 1084.97607421875,
                      "y": 1492.697021484375,
                      "z": 1549.372314453125
                  },
                  "orientation": {
                      "w": 0.4168950617313385,
                      "x": -0.40458545088768005,
                      "y": 0.7918776273727417,
                      "z": -0.18825240433216095
                  },
                  "confidence": 2,
                  "pixel": {
                      "x": 1126,
                      "y": 1124
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": 1048.9881591796875,
                      "y": 1675.9716796875,
                      "z": 1511.1949462890625
                  },
                  "orientation": {
                      "w": 0.43320316076278687,
                      "x": 0.27200907468795776,
                      "y": 0.844486653804779,
                      "z": 0.15870851278305054
                  },
                  "confidence": 2,
                  "pixel": {
                      "x": 1130,
                      "y": 1244
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": 922.789306640625,
                      "y": 696.2584228515625,
                      "z": 1548.36083984375
                  },
                  "orientation": {
                      "w": 0.02709946781396866,
                      "x": 0.6638121604919434,
                      "y": 0.7252053618431091,
                      "z": 0.18082083761692047
                  },
                  "confidence": 2,
                  "pixel": {
                      "x": 1025,
                      "y": 733
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": 875.0802001953125,
                      "y": 1092.051025390625,
                      "z": 1630.057373046875
                  },
                  "orientation": {
                      "w": -0.0012034407118335366,
                      "x": 0.7683700919151306,
                      "y": 0.613351047039032,
                      "z": 0.18277445435523987
                  },
                  "confidence": 2,
                  "pixel": {
                      "x": 996,
                      "y": 895
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": 946.2069091796875,
                      "y": 1462.7060546875,
                      "z": 1741.142333984375
                  },
                  "orientation": {
                      "w": -0.05690353736281395,
                      "x": 0.8502435088157654,
                      "y": 0.5038533210754395,
                      "z": 0.14134980738162994
                  },
                  "confidence": 2,
                  "pixel": {
                      "x": 1009,
                      "y": 1024
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": 870.7848510742188,
                      "y": 1619.0191650390625,
                      "z": 1766.4652099609375
                  },
                  "orientation": {
                      "w": -0.14139999449253082,
                      "x": 0.9588092565536499,
                      "y": -0.2402128428220749,
                      "z": 0.05466855689883232
                  },
                  "confidence": 2,
                  "pixel": {
                      "x": 977,
                      "y": 1084
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": 1039.4971923828125,
                      "y": 86.82440948486328,
                      "z": 1458.22509765625
                  },
                  "orientation": {
                      "w": -0.30997514724731445,
                      "x": 0.7002639174461365,
                      "y": -0.582656741142273,
                      "z": 0.27213406562805176
                  },
                  "confidence": 2,
                  "pixel": {
                      "x": 1080,
                      "y": 469
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": 944.4915161132812,
                      "y": 14.668583869934082,
                      "z": 1346.397705078125
                  },
                  "orientation": {
                      "w": -0.30997514724731445,
                      "x": 0.7002639174461365,
                      "y": -0.582656741142273,
                      "z": 0.27213406562805176
                  },
                  "confidence": 2,
                  "pixel": {
                      "x": 1069,
                      "y": 437
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": 993.953125,
                      "y": -10.73670768737793,
                      "z": 1358.73681640625
                  },
                  "orientation": {
                      "w": 0.4116133749485016,
                      "x": -0.08316083252429962,
                      "y": 0.9071618914604187,
                      "z": 0.026757702231407166
                  },
                  "confidence": 2,
                  "pixel": {
                      "x": 1088,
                      "y": 425
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": 1108.9359130859375,
                      "y": 28.672683715820312,
                      "z": 1401.952880859375
                  },
                  "orientation": {
                      "w": 0.27213406562805176,
                      "x": 0.582656741142273,
                      "y": 0.7002639174461365,
                      "z": 0.30997514724731445
                  },
                  "confidence": 2,
                  "pixel": {
                      "x": 1129,
                      "y": 444
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": 951.6780395507812,
                      "y": -12.367228507995605,
                      "z": 1390.998779296875
                  },
                  "orientation": {
                      "w": 0.4116133749485016,
                      "x": -0.08316083252429962,
                      "y": 0.9071618914604187,
                      "z": 0.026757702231407166
                  },
                  "confidence": 2,
                  "pixel": {
                      "x": 1057,
                      "y": 425
                  },
                  "valid": true
              },
              {
                  "position": {
                      "x": 986.1843872070312,
                      "y": 14.333789825439453,
                      "z": 1516.9847412109375
                  },
                  "orientation": {
                      "w": -0.30997514724731445,
                      "x": 0.7002639174461365,
                      "y": -0.582656741142273,
                      "z": 0.27213406562805176
                  },
                  "confidence": 2,
                  "pixel": {
                      "x": 1037,
                      "y": 436
                  },
                  "valid": true
              }
          ],
          "x_pos": -0.9719134521484375,
          "y_pos": -1.4816478271484375,
          "head_angle": 0.8501802108715988,
          "body_angle": 0.6271526131941667
      }
  ],
}