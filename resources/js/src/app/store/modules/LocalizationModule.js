import { isNullOrUndefined } from "../../helper/utils";
import { setUrlParam } from "../../services/UrlService";

const ApiService = require("../../services/ApiService");

const state = () => ({
    shippingCountries: [],
    shippingCountryId: null
});

const mutations =
    {
        setShippingCountries(state, shippingCountries)
        {
            state.shippingCountries = shippingCountries;
        },

        setShippingCountryId(state, shippingCountryId)
        {
            if (shippingCountryId !== state.shippingCountryId && !App.isSSR)
            {
                document.dispatchEvent(new CustomEvent("afterShippingCountryChanged", { detail: shippingCountryId }));
            }

            state.shippingCountryId = shippingCountryId;
        }
    };

const actions =
    {
        selectShippingCountry({ commit, state }, { shippingCountryId, openBasketPreview })
        {
            return new Promise((resolve, reject) =>
            {

                commit("setShippingCountryId", shippingCountryId);
                ApiService.post("/rest/io/shipping/country", { shippingCountryId })
                    .done(data =>
                    {
                        if (isNullOrUndefined(state.shippingCountryId) || state.shippingCountryId !== data)
                        {
                            if (openBasketPreview)
                            {
                                setUrlParam({ openBasketPreview: 1 });
                            }

                            window.location.reload();
                        }
                        resolve(data);
                    })
                    .fail(error =>
                    {
                        commit("setShippingCountryId", state.shippingCountryId);
                        reject(error);
                    });
            });
        }
    };

const getters =
    {
        getCountryName: state => countryId =>
        {
            if (countryId > 0)
            {
                const country = state.shippingCountries.find(country => country.id === countryId);

                if (!isNullOrUndefined(country))
                {
                    return country.currLangName;
                }
            }

            return "";
        }
    };

export default
{
    state,
    mutations,
    actions,
    getters
};
