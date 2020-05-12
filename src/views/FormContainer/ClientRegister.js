import React, { useReducer, useState } from "react";
import {
  WizardContainer,
  WizardPage,
} from "../../components/container/WizardContainer";
import { SimpleInput } from "../../components/Inputs/SimpleInput";
import { optionalFn } from "../../Core/helpers";
import { CameraView } from "./../../components/Inputs/CameraView";
import { ColorPicker } from "../../components/Inputs/ColorManager";
import { GridItem, GridContainer } from "../../components/Grid/Grid.js";
import { Textarea } from "./../../components/Inputs/Textarea";
import "./scss/clientregister.scss";
export function ClientRegister() {
  const [content, setData] = useState({});
  const [page, setPage] = useState(0);
  console.log(content);
  return (
    <WizardContainer
      page={page}
      style={{ width: "100%" }}
      onLoad={(data) => {
        console.log(data);
      }}
    >
      <WizardPage>
        <PaymentOrContactForm />
      </WizardPage>
      <WizardPage>
        <PersonalForm
          onSubmit={(data) => {
            setData({ ...content, ...data });
            setPage(1);
          }}
        />
      </WizardPage>
      <WizardPage>
        <CompanyForm
          onSubmit={(data) => {
            setData({ ...content, ...data });
            setPage(2);
          }}
        />
      </WizardPage>
      <WizardPage>
        <ProjectForm
          onSubmit={(data) => {
            setData({ ...content, ...data });
            setPage(3);
          }}
        />
      </WizardPage>
    </WizardContainer>
  );
}
export function PersonalForm({ onSubmit }) {
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { name: "", phone: "", mail: "" }
  );
  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        optionalFn(onSubmit)(state);
      }}
    >
      <SimpleInput
        title="Nombre Completo"
        errorMessage="Un nombre (usualmente) solo contiene letras"
        pattern="[A-Z a-z]+"
        required
        onChange={({ target }) => {
          setState({ name: target.value });
        }}
      />
      <SimpleInput
        title="Teléfono"
        placeholder="xx-xx-xx-xx"
        type="tel"
        required
        onChange={({ target }) => {
          setState({ phone: target.value });
        }}
      />
      <SimpleInput
        title="Correo"
        placeholder="example@example.com"
        type="email"
        errorMessage="Este no es un correo valido"
        required
        onChange={({ target }) => {
          setState({ mail: target.value });
        }}
      />
      <button>Siguiente</button>
    </form>
  );
}
export function CompanyForm({ onSubmit }) {
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { companyName: "", rfc: "", country: "" }
  );
  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        optionalFn(onSubmit)(state);
      }}
    >
      <SimpleInput
        title="Nombre de la empresa"
        required
        onChange={({ target }) => {
          setState({ companyName: target.value });
        }}
      />
      <SimpleInput
        title="R.F.C"
        errorMessage="Este no parece un RFC valido"
        pattern="^([A-Z,Ñ,&]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[A-Z|\d]{3})$"
        required
        placeholder="ex: XAXX010101000"
        onChange={({ target }) => {
          setState({ rfc: target.value });
        }}
      />
      <SimpleInput
        title="Páis"
        required
        onChange={({ target }) => {
          setState({ country: target.value });
        }}
      />
      <SimpleInput
        title="Estado"
        required
        onChange={({ target }) => {
          setState({ state: target.value });
        }}
      />
      <SimpleInput
        title="Ciudad"
        required
        onChange={({ target }) => {
          setState({ city: target.value });
        }}
      />
      <SimpleInput
        title="Calle y número"
        required
        onChange={({ target }) => {
          setState({ address: target.value });
        }}
      />
      <SimpleInput
        title="Colonia"
        required
        onChange={({ target }) => {
          setState({ colony: target.value });
        }}
      />
      <button>Siguiente</button>
    </form>
  );
}
export function ProjectForm({ onSubmit }) {
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      desiredDomain: "",
      slogan: "",
      colors: { primary: "#ffffff", secondary: "#fff", details: "#fff" },
      description: "",
      logo: null,
    }
  );
  const { colors, logo } = state;
  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        optionalFn(onSubmit)(state);
      }}
    >
      <CameraView
        title="Logo"
        noCam={true}
        photo={logo}
        onPhotoTaken={(logo) => {
          setState({ logo });
        }}
      />
      <SimpleInput
        title="Dominio Deseado"
        placeholder="El nombre de tu sitio web"
        required
        onChange={({ target }) => {
          setState({ desiredDomain: target.value });
        }}
      />
      <SimpleInput
        title="Slogan"
        placeholder="ex:Un sitio web para ti"
        required
        onChange={({ target }) => {
          setState({ slogan: target.value });
        }}
      />
      <label style={{ margin: "20px 15px" }}>
        Selecciona tus colores corporativos
      </label>
      <GridContainer className="colors">
        <GridItem xs={4}>
          <label>Principal</label>
          <ColorPicker
            color={colors.primary}
            onChange={(color) => {
              let primary = color;
              setState({ colors: { ...colors, primary } });
            }}
          />
        </GridItem>

        <GridItem xs={4}>
          <label>Secundario</label>
          <ColorPicker
            color={colors.secondary}
            onChange={(color) => {
              let secondary = color;
              setState({ colors: { ...colors, secondary } });
            }}
          />
        </GridItem>

        <GridItem xs={4}>
          <label>Detalles</label>
          <ColorPicker
            color={colors.details}
            onChange={(color) => {
              let details = color;
              setState({ colors: { ...colors, details } });
            }}
          />
        </GridItem>
      </GridContainer>
      <Textarea
        title="Hablanos un poco de tu proyecto"
        onChange={(description) => {
          setState({ description });
        }}
      ></Textarea>
      <button>Concluir</button>
    </form>
  );
}
export function PaymentOrContactForm({ onSubmit, data }) {
  return (
    <GridContainer>
      <GridItem xs={6} className="payment">
        Pagar
      </GridItem>
      <GridItem xs={6} className="contact">
        Contactar asesor
      </GridItem>
    </GridContainer>
  );
}
