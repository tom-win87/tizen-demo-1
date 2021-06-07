/**
 * Copyright (c) 2015, Samsung Electronics Co., Ltd
 * All Rights Reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *
 *  * Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 *
 *  * Neither the name of Samsung Electronics nor the names of its
 *    contributors may be used to endorse or promote products derived from this
 *    software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * @brief
 * This is a simple hello world NaCl module based on C++ PPAPI interfaces.
 * It waits for a string type message form JavaScript and sends back an echo
 * message.
 * For more information about essential NaCl application structure visit:
 * @see https://developer.chrome.com/native-client/devguide/coding/application-structure
 */

#include "ppapi/cpp/instance.h"
#include "ppapi/cpp/module.h"
#include "ppapi/cpp/var.h"

const char* kEcho = "Echo from NaCl: ";

/**
 * This is a base of your NaCl application. There is one instance of
 * <code>pp::Instance</code> class object per <embed> element on a web page.
 */
class HelloWorldInstance : public pp::Instance {
 public:
  /**
   * Your constructor needs to call the base class <code>pp::Instance(PP_Instance)</code>
   * constructor to properly initialize itself - it's the only way because
   * <code>pp::Instance(PP_Instance)</code> is the only public constructor.
   */
  explicit HelloWorldInstance(PP_Instance instance)
      : pp::Instance(instance) {
  }

  virtual ~HelloWorldInstance() {
  }

  /**
   * Handles messages from JS sent by <code>nacl_module.postMessage(...)</code>.
   * @see <code>HandleMessage</code> in instance.h file for more details.
   */
  virtual void HandleMessage(const pp::Var& message) {
    if (message.is_string()) {
      PostMessage(kEcho + message.AsString() + "\n");
    }
  }

  /**
   * Initializes this instance with provided arguments listed in the <embed>
   * tag.
   * @see <code>Init()</code> in instance.h file for more details.
   */
  virtual bool Init(uint32_t argc, const char* argn[], const char* argv[]) {
    return true;
  }
};

/**
 * A NaCl app must have one class that implements <code>pp::Module</code>.
 * Basically you don't need to implement anything more than it's done in this
 * class. Just change names of HelloWorldModule and HelloWorldInstance classes
 * and implement you own class that inherits <code>pp::Instance</code>.
 */
class HelloWorldModule : public pp::Module {
 public:
  HelloWorldModule()
      : pp::Module() {
  }

  virtual ~HelloWorldModule() {
  }

  /**
   * This method is called every time a browser encounters an <embed> element
   * on a web page.
   * It has to be implemented to launch a NaCl application.
   */
  virtual pp::Instance* CreateInstance(PP_Instance instance) {
    return new HelloWorldInstance(instance);
  }
};

namespace pp {

/**
 * This function is an entry point to a NaCl application.
 * It must be implemented.
 */
Module* CreateModule() {
  return new HelloWorldModule();
}

}  // namespace pp
